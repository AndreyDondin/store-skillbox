<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

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
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productPerPage: 3,
    };
  },
  computed: {
    filterProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterPriceFrom,
        );
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
      }

      if (this.filterCategoryId > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoriesId === this.filterCategoryId,
        );
      }

      if (this.filterColorId > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.colorId.includes(this.filterColorId),
        );
      }

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productPerPage;
      return this.filterProducts.slice(offset, offset + this.productPerPage);
    },
    countProducts() {
      return this.filterProducts.length;
    },
  },
};
</script>