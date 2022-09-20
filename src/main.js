import Vue from 'vue';
import App from './App.vue';
import getMessage from './getMessage';
import { alertMessage, name } from './data';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

getMessage(alertMessage);
getMessage(name);
