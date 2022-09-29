<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <aside class="filter" v-if="productData">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submitFilter">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            :placeholder="minPrice"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            :placeholder="maxPrice"
            name="max-price"
            v-model.number="currentPriceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model.number="currentCategotyId"
          >
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                :value="color.id"
                v-model.number="currentColorId"
              />
              <span
                class="colors__value"
                :title="color.title"
                :style="{ 'background-color': color.code }"
              >
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="8"
                checked=""
              />
              <span class="check-list__desc">
                8
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16" />
              <span class="check-list__desc">
                16
                <span>(461)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32" />
              <span class="check-list__desc">
                32
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64" />
              <span class="check-list__desc">
                64
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="128" />
              <span class="check-list__desc">
                128
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="264" />
              <span class="check-list__desc">
                264
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">Применить</button>
      <button class="filter__reset button button--second" type="button" @click="resetFilter">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import BASE_PRODUCT_URL from '@/data/config';

export default {
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorId'],
  data() {
    return {
      currentPriceFrom: null,
      currentPriceTo: null,
      currentCategotyId: 0,
      currentColorId: 0,

      categoriesData: null,
      colorsData: null,
      productData: null,
    };
  },
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
    maxPrice() {
      const prices = this.productData.items.map((prod) => prod.price);
      return Math.max(...prices);
    },
    minPrice() {
      const prices = this.productData.items.map((prod) => prod.price);
      return Math.min(...prices);
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategotyId = value;
    },
    colorId(value) {
      this.currentColorId = value;
    },
  },
  methods: {
    submitFilter() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategotyId);
      this.$emit('update:colorId', this.currentColorId);
    },
    resetFilter() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorId', 0);
    },
    loadProductData() {
      axios.get(`${BASE_PRODUCT_URL}/api/products`).then((response) => {
        this.productData = response.data;
      });
    },
    loadCategoriesData() {
      axios.get(`${BASE_PRODUCT_URL}/api/productCategories`).then((response) => {
        this.categoriesData = response.data;
      });
    },
    loadColorsData() {
      axios.get(`${BASE_PRODUCT_URL}/api/colors`).then((response) => {
        this.colorsData = response.data;
      });
    },
  },
  created() {
    this.loadCategoriesData();
    this.loadColorsData();
    this.loadProductData();
  },
};
</script>
