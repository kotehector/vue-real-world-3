import { createRouter, createWebHistory } from 'vue-router'
// import EventList from '../views/EventList.vue'
const EventList = () =>
  import(/* webpackChunkName: "event" */ '../views/EventList.vue')
const EventCreate = () =>
  import(/* webpackChunkName: "event" */ '../views/EventCreate.vue')
const EventLayout = () =>
  import(/* webpackChunkName: "event" */ '../views/event/Layout.vue')
const EventDetails = () =>
  import(/* webpackChunkName: "event" */ '../views/event/Details.vue')
const EventRegister = () =>
  import(/* webpackChunkName: "event" */ '../views/event/Register.vue')
const EventEdit = () =>
  import(/* webpackChunkName: "event" */ '../views/event/Edit.vue')
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
import ErrorDisplay from '../views/ErrorDisplay.vue'

import NProgress from 'nprogress'
// import EventService from '@/services/EventService.js'
import GStore from '@/store'
import { setTimeout } from 'core-js'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/create-event',
    name: 'EventCreate',
    component: EventCreate,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/event/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    // beforeEnter: to => {
    //   return EventService.getEvent(to.params.id)
    //     .then(response => {
    //       GStore.event = response.data
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       if (error.response && error.response.status === 404) {
    //         return {
    //           name: '404Resource',
    //           params: { resource: 'event' }
    //         }
    //       } else {
    //         return {
    //           name: 'NetworkError'
    //         }
    //       }
    //     })
    // },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: { requireAuth: true }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/error/:error',
    name: 'ErrorDisplay',
    props: true,
    component: ErrorDisplay
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from) => {
  NProgress.start()

  const notAuthorized = true
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page'

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)

    if (from.href) {
      return false
    } else {
      return { path: '/' }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
