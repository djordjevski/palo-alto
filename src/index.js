import Vue from 'vue'
import router from './router/router'
import store from './store/index'
import App from './App.vue'

/* eslint-disable-next-line no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
