<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <PreLoader v-if="$store.state.cartProductLoading" />
  <ErrorLoading
    v-else-if="$store.state.cartProductLoadingError"
    message="Не удалось загрузить корзину товаров"
    :buttonAction="loadCartData"
  />
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Корзина </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> {{ totalAmount }} товара </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartProduct v-for="item in products" :key="item.productId" :item="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | formatNumber }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">Оформить заказ</button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import formatNumber from '@/helpers/formatNumber';
import { mapGetters, mapActions } from 'vuex';
import CartProduct from '@/components/CartProduct.vue';
import PreLoader from '@/components/PreLoader.vue';
import ErrorLoading from '@/components/ErrorLoading.vue';

export default {
  filters: {
    formatNumber,
  },
  computed: {
    ...mapGetters({
      products: 'cartProductDetail',
      totalPrice: 'totalPrice',
      totalAmount: 'totalAmount',
    }),
  },
  components: { CartProduct, PreLoader, ErrorLoading },
  methods: {
    ...mapActions(['loadCartData']),
  },
};
</script>
