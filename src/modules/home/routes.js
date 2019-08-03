export default [
  {
    path: '/',
    name: 'home',
    meta: {
        requiresAuth: true
    },
    component: () => import('./home')
  },
  {
    path: 'advertisers',
    name: 'home.ad',
    meta: {
        requiresAuth: true
    },
    component: () => import('./ad')
  },
  {
    path: 'apply',
    name: 'home.apply',
    meta: {
        requiresAuth: true
    },
    component: () => import('./apply')
  },
  {
    path: 'apply/advertisers',
    name: 'home.advertisers',
    component: () => import('./advertisers')
  },
  {
    path: 'apply/flow',
    name: 'home.flow',
    component: () => import('./flow')
  }
]
