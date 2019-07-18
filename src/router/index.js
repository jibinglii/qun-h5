import { routes as home } from '$modules/home'
import { routes as auth } from '$modules/auth'
import { routes as me } from '$modules/me'
import { routes as bank } from '$modules/bank'
import { routes as withdraw } from '$modules/withdraw'
import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'
Vue.use(Router)

const AppRoute = {
    path: '/:store/',
    component: () =>
        import ('../app'),
        children: [...home, ...auth, ...me, ...bank, ...withdraw, 
    ]
}

const routes = [{
  path: '/404',
  component: () =>
      import ('../not-found')
}, AppRoute, {
    path: '*',
    component: () =>
        import ('../not-found')
}]

const scrollBehavior = function(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    } else {
        if (to.hash) {
            if (document.querySelector(to.hash)) {
                return {
                    selector: to.hash
                }
            }
            return false
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ x: 0, y: 0 });
            }, 0);
        })
    }
}

const router = new Router({
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    mode: 'history',
    scrollBehavior
})

router.beforeEach(beforeEach)
export default router
