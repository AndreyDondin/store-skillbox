<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }"> Корзина </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> {{ totalAmount }} товара </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="sendOrder">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              title="ФИО"
              :error="errorForm.name"
              placeholder="Введите ваше полное имя"
              v-model="formData.name"
            />
            <BaseFormText
              title="Адрес доставки"
              :error="errorForm.address"
              placeholder="Введите ваш адрес"
              v-model="formData.address"
            />
            <BaseFormText
              title="Телефон"
              :error="errorForm.phone"
              type="tel"
              placeholder="Введите ваш телефон"
              v-model="formData.phone"
            />
            <BaseFormText
              title="Email"
              :error="errorForm.email"
              type="email"
              placeholder="Введи ваш Email"
              v-model="formData.email"
            />
            <BaseFormTextarea
              title="Комментарий к заказу"
              :error="errorForm.comment"
              placeholder="Ваши пожелания"
              v-model="formData.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  />
                  <span class="options__value"> Самовывоз <b>бесплатно</b> </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500" />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card" />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash" />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.productId">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price | formatNumber }} ₽</b>
              <span>Артикул: {{ item.productId }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>
              Итого: <b>{{ totalAmount }}</b> товара на сумму
              <b>{{ totalPrice | formatNumber }} ₽</b>
            </p>
          </div>

          <button
            class="cart__button button button--primery"
            style="display: flex; justify-content: center"
            type="submit"
          >
            <span v-show="!sendingOrder">Оформить заказ </span>
            <SpinnerLoading v-show="sendingOrder" />
          </button>
        </div>

        <div class="cart__error form__error-block" v-if="errorFormMessage">
          <h4>Заявка не отправлена!</h4>
          <p>{{ errorFormMessage }}</p>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import { mapGetters } from 'vuex';
import formatNumber from '@/helpers/formatNumber';
import axios from 'axios';
import BASE_PRODUCT_URL from '@/data/config';
import SpinnerLoading from '@/components/SpinnerLoading.vue';

export default {
  data() {
    return {
      formData: {},
      errorForm: {},
      errorFormMessage: '',
      sendingOrder: false,
    };
  },
  filters: { formatNumber },
  components: { BaseFormText, BaseFormTextarea, SpinnerLoading },
  computed: {
    ...mapGetters({
      products: 'cartProductDetail',
      totalPrice: 'totalPrice',
      totalAmount: 'totalAmount',
    }),
  },
  methods: {
    sendOrder() {
      this.sendingOrder = true;
      this.errorForm = {};
      this.errorFormMessage = '';
      axios
        .post(
          `${BASE_PRODUCT_URL}/api/orders`,
          {
            ...this.formData,
          },
          {
            params: {
              userAccessKey: this.$store.state.userAccessKey,
            },
          }
        )
        .then((response) => {
          this.$store.commit('resetCart');
          this.formData = {};
          this.$store.commit('updateOrderInfoData', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.errorForm = error.response.data.error.request || {};
          this.errorFormMessage = error.response.data.error.message;
        })
        .finally(() => {
          this.sendingOrder = false;
        });
    },
  },
};
</script>
