import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Servicio from '@/components/servicio/NewServicio'
import ServicioReportTwo from '@/components/servicio/ServicioReportTwo'
import ServicioReportFinal from '@/components/servicio/ServicioReportFinal'

import UploadFileTest from '@/components/UploadFileTest'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/servicio',
      name: 'servicio',
      component: Servicio
    },
    {
      path: '/report',
      name: 'report',
      component: ServicioReportTwo
    },
    {
      path: '/final',
      name: 'final',
      component: ServicioReportFinal
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadFileTest
    }
  ]
})
