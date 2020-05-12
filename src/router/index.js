import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Home2 from '@/components/Home2'
import Resume from '@/components/Resume'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home2',
      name: 'Home2',
      component: Home2
    },
    {
      path: '/Resume',
      name: 'Resume',
      component: Resume
    },
  ]
})
