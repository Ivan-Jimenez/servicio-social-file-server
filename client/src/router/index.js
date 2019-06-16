import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/user/Login'
import Signup from '@/components/user/Signup'
import NewServicio from '@/components/servicio/NewServicio'
import ReportServicio from '@/components/servicio/ReportServicio'
import FinalServicio from '@/components/servicio/FinalServicio'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/servicio',
      name: 'servicio',
      component: NewServicio
    },
    {
      path: '/report/:form',
      name: 'report',
      component: ReportServicio,
      props: true
    },
    {
      path: '/final',
      name: 'final',
      component: FinalServicio,
      props: true
    }
  ]
})
