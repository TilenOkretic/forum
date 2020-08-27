import Vue from 'vue';
import CategoryList from './components/CategoryList.vue';
import 'bootswatch/dist/slate/bootstrap.css';
import router from './router';
import store from './store';
import App from './App.vue';


Vue.config.productionTip = false;

Vue.component('category-list', CategoryList);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
