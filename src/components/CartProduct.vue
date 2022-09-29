<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.img" width="120" height="120" :alt="item.product.title" />
    </div>
    <h3 class="product__title">{{ item.product.title }}</h3>
    <!-- <p class="product__info">Объем: <span>128GB</span></p> -->
    <span class="product__code"> Артикул: {{ item.productId }} </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click="decrementProductAmount">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count" />

      <button type="button" aria-label="Добавить один товар" @click="incrementProductAmount">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price"> {{ (item.product.price * item.amount) | formatNumber }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteCartProduct"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>
<script>
import formatNumber from '@/helpers/formatNumber';
import { mapActions } from 'vuex';

export default {
  props: ['item'],
  filters: {
    formatNumber,
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductsAmount', {
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
  methods: {
    ...mapActions(['deleteProduct']),
    deleteCartProduct() {
      this.deleteProduct({ productId: this.item.productId });
    },
    incrementProductAmount() {
      this.amount += 1;
    },
    decrementProductAmount() {
      if (this.amount === 1) {
        return;
      }
      this.amount -= 1;
    },
  },
};
</script>
