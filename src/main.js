import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import User from './api/user';
import Csrf from "./api/Csrf";

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

import './registerServiceWorker'
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)

import excel from 'vue-excel-export'

Vue.use(excel)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

//==============================================================
function isLoggedIn() {
  return localStorage.getItem("auth001");
}

router.beforeEach((to, from, next) => {
  Csrf.getcookie().then(() => {
    User.token()
      .then((response) => {})
      .catch(error => {
        localStorage.removeItem("auth001")

      })
  });

  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

//==============================================================
router.beforeResolve((to, from, next) => {

  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})


/* eslint-disable no-new */
new Vue({

  el: '#app',
  render: h => h(App),
  router,

})
