import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Login from '@/components/Login'
import Home from '@/components/Student/Home'
import Home2 from '@/components/Student/Home2'
import Resume from '@/components/Student/Resume'
import Search from '@/components/Student/Search'
import Search2 from '@/components/Student/Search2'
import MyJob from '@/components/Student/MyJob'
import MyTalk from '@/components/Student/MyTalk'
import JobDetail from '@/components/Student/JobDetail'
import MyJobDetail from '@/components/Student/MyJobDetail'
import TalkDetail from '@/components/Student/TalkDetail'
import MyTalkDetail from '@/components/Student/MyTalkDetail'

import ResSer from '@/components/Company/ResSer'
import Enterprice from '@/components/Company/Enterprice'
import ManPos from '@/components/Company/ManPos'
import ManTalk from '@/components/Company/ManTalk'
import NewPos from '@/components/Company/NewPos'
import NewTalk from '@/components/Company/NewTalk'

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
      path: '/Student/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Student/Home2',
      name: 'Home2',
      component: Home2
    },
    {
      path: '/Student/Resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/Student/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/Student/Search2',
      name: 'Search2',
      component: Search2
    },
    {
      path: '/Student/MyJob',
      name: 'MyJob',
      component: MyJob
    },
    {
      path: '/Student/MyTalk',
      name: 'MyTalk',
      component: MyTalk
    },
    {
      path: '/Student/Resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/Student/JobDetail',
      name: 'JobDetail',
      component: JobDetail
    },
    {
      path: '/Student/MyJobDetail',
      name: 'MyJobDetail',
      component: MyJobDetail
    },
    {
      path: '/Student/TalkDetail',
      name: 'TalkDetail',
      component: TalkDetail
    },
    {
      path: '/Student/MyTalkDetail',
      name: 'MyTalkDetail',
      component: MyTalkDetail
    },
    {
      path: '/Company/ResSer',
      name: 'ResSer',
      component: ResSer
    },
    {
      path: '/Company/Enterprice',
      name: 'Enterprice',
      component: Enterprice
    },
    {
      path: '/Company/NewPos',
      name: 'NewPos',
      component: NewPos
    },
    {
      path: '/Company/NewTalk',
      name: 'NewTalk',
      component: NewTalk
    },
    {
      path: '/Company/ManPos',
      name: 'ManPos',
      component: ManPos
    },
    {
      path: '/Company/ManTalk',
      name: 'ManTalk',
      component: ManTalk
    }
  ]
})
