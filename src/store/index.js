import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      { productId: 1, amount: 5 },
      { productId: 2, amount: 1 },
    ],
  },
  mutations: {
    addToCartProducts(state, { productId, amount }) {
      const product = state.cartProducts.find((prod) => prod.productId === productId);
      if (product) {
        product.amount += amount;
      } else state.cartProducts.push({ productId, amount });
    },
    updateCartAmout(state, { productId, amount }) {
      const product = state.cartProducts.find((prod) => prod.productId === productId);
      if (product) {
        product.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((prod) => prod.productId !== productId);
    },
  },
  getters: {
    cartProductDetail(state) {
      return state.cartProducts.map((prod) => ({
        ...prod,
        product: products.find((p) => p.id === prod.productId),
      }));
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
});
