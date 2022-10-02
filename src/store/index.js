import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import BASE_PRODUCT_URL from '@/data/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartProductLoading: false,
    cartProductLoadingError: false,
    orderInfoData: null,
  },
  mutations: {
    updateOrderInfoData(state, orderInfo) {
      state.orderInfoData = orderInfo;
    },
    updateCartAmout(state, { productId, amount }) {
      const product = state.cartProducts.find((prod) => prod.productId === productId);
      if (product) {
        product.amount = amount;
      }
    },
    updateAccessKey(state, key) {
      state.userAccessKey = key;
    },
    updateCartProductsData(state, cartProducts) {
      state.cartProductsData = cartProducts;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((prod) => ({
        productId: prod.product.id,
        amount: prod.quantity,
      }));
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
  },
  getters: {
    cartProductDetail(state) {
      return state.cartProducts.map((prod) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === prod.productId);
        return {
          ...prod,
          product: {
            ...product,
            img: product.image.file.url,
          },
        };
      });
    },
    totalPrice(state, getters) {
      return getters.cartProductDetail.reduce(
        (acc, prod) => prod.product.price * prod.amount + acc,
        0
      );
    },
    totalAmount(state, getters) {
      return getters.cartProductDetail.reduce((acc, prod) => prod.amount + acc, 0);
    },
  },
  actions: {
    loadCartData(context) {
      this.state.cartProductLoading = true;
      this.state.cartProductLoadingError = false;
      return axios
        .get(`${BASE_PRODUCT_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('accessKey', response.data.user.accessKey);
            context.commit('updateAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .catch(() => {
          this.state.cartProductLoadingError = true;
        })
        .finally(() => {
          this.state.cartProductLoading = false;
        });
    },
    addToCartProducts(context, { productId, amount }) {
      return axios
        .post(
          `${BASE_PRODUCT_URL}/api/baskets/products`,
          {
            productId,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          }
        )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    loadOrderInfo(context, orderId) {
      return axios
        .get(`${BASE_PRODUCT_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateOrderInfoData', response.data);
        });
    },
    updateCartProductsAmount(context, { productId, amount }) {
      context.commit('updateCartAmout', { productId, amount });
      if (amount < 1) {
        return;
      }
      axios
        .put(
          `${BASE_PRODUCT_URL}/api/baskets/products`,
          {
            productId,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          }
        )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteProduct(context, { productId }) {
      return axios
        .delete(`${BASE_PRODUCT_URL}/api/baskets/products`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: {
            productId,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
  },
});
