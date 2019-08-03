import vuex from '../vuex'

const needAuth = route => route.meta.requiresAuth === true

const beforeEach = (to, from, next) => {
  /**
   * Otherwise  if authentication is required login.
   */
  vuex
    .dispatch('checkUserToken')
    .then(() => {
      console.log("LOGGED:"+vuex.getters.isLogged);
      console.log(""+to.path);
      if (vuex.getters.isLogged && to.path=='/') {
        if (vuex.getters.currentUser.roles.indexOf("广告主")>=0) {
          return next({ path: '/advertisers' })
        }else if (vuex.getters.currentUser.roles.indexOf("流量主")<0) {
          return next({ path: '/apply' })
        } 
      }
      return next()
    })
    .catch(() => {
      if (needAuth(to)) {
        // No token, or it is invalid
        return next({ name: 'auth.login', query: { redirect: encodeURIComponent(window.location.href) } }) // redirect to login
      }
      next()
    })
}

export default beforeEach
