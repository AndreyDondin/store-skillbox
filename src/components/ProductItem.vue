<!-- eslint-disable vuejs-accessibility/label-has-for -->

<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#"
    @click.prevent="goToPage('product',{id:product.id})">
      <img :src="product.img" srcset="img/radio@2x.jpg 2x" :alt="product.title" />
    </a>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{product.price | formatNumber}} ₽ </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colorId" :key="color">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            value="#73B6EA"

          />
          <span class="colors__value" :style="{'background-color': colors[color-1].color}"> </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import colors from '@/data/colors';
import goToPage from '@/helpers/goToPage';
import formatNumber from '@/helpers/formatNumber';

export default {
  props: ['product'],
  data() {
    return { color: '#73B6EA' };
  },
  computed: {
    colors() {
      return colors;
    },
  },
  methods: {
    goToPage,
  },
  filters: {
    formatNumber,
  },
};
</script>
