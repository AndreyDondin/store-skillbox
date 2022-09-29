<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ countProducts }} товар </span>
    </div>
    <ErrorLoading
      v-if="productsLoadingError"
      :message="errorMessage"
      :buttonAction="loadProductData"
    />
    <PreLoader v-if="productsLoading" />
    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-id.sync="filterColorId"
      />
      <section class="catalog">
        <ProductList :products="products" />

        <BasePagination v-model="page" :count="countProducts" :per-page="productPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import BASE_PRODUCT_URL from '@/data/config';
import PreLoader from '@/components/PreLoader.vue';
import ErrorLoading from '@/components/ErrorLoading.vue';

export default {
  components: { ProductList, BasePagination, ProductFilter, PreLoader, ErrorLoading },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productPerPage: 3,
      productData: null,
      productsLoading: false,
      productsLoadingError: false,
      errorMessage: '',
    };
  },
  computed: {
    filterProducts() {
      let filteredProducts = this.productData.items;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterPriceFrom
        );
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
      }

      if (this.filterCategoryId > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoriesId === this.filterCategoryId
        );
      }

      if (this.filterColorId > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          product.colorId.includes(this.filterColorId)
        );
      }

      return filteredProducts;
    },
    products() {
      return this.productData
        ? this.productData.items.map((prod) => ({ ...prod, img: prod.image.file.url }))
        : [];
    },
    countProducts() {
      return this.productData ? this.productData.pagination.total : 0;
    },
  },
  methods: {
    loadProductData() {
      this.productsLoading = true;
      this.productsLoadingError = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${BASE_PRODUCT_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productPerPage,
              categoryId: this.filterCategoryId,
              colorId: this.filterColorId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            },
          })
          .then((response) => {
            this.productData = response.data;
          })
          .catch((error) => {
            this.productsLoadingError = true;
            const errMsg = +error.response.status.toString().slice(0, 1);
            if (errMsg === 5) {
              this.errorMessage = 'Упс,что-то на сервере,мы уже знаем о проблеме и исправляем ее';
            } else this.errorMessage = 'Проверьте соединение и попробуйте еще раз';
          })
          .finally(() => {
            this.productsLoading = false;
          });
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProductData();
    },
    filterPriceFrom() {
      this.loadProductData();
    },
    filterPriceTo() {
      this.loadProductData();
    },
    filterColorId() {
      this.loadProductData();
    },
  },
  created() {
    this.loadProductData();
  },
};
</script>
