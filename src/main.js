// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import '../theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import qs from 'qs'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.prototype.$qs = qs
Vue.prototype.HOME = '/api'
// ≈‰÷√ƒ¨»œURL
Axios.defaults.baseURL = '/api'
Axios.headers = {'Content-Type': 'application/json'}
Axios.timeout = 1000 * 10

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
