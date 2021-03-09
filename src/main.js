import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import * as VueThreejs from './components/vue_three_js'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.use(VueThreejs)
// Vue.use(BootstrapVue)

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
