<!-- eslint-disable vuejs-accessibility/label-has-for -->

<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img :src="product.img" srcset="img/radio@2x.jpg 2x" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: { id: product.id } }">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price"> {{ product.price | formatNumber }} ₽ </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="color.id"
            v-model.number="currentColorId"
          />
          <span class="colors__value" :style="{ 'background-color': color.code }"> </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import formatNumber from '@/helpers/formatNumber';

export default {
  props: ['product'],
  data() {
    return { currentColorId: 1 };
  },
  computed: {
    colors() {
      return this.currentColorId;
    },
  },
  filters: {
    formatNumber,
  },
};
</script>
