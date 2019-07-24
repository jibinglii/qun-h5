export default [
  {
    path: 'resource/resources',
    name: 'resources',
    meta: {
      requiresAuth: true
    },
    component: () => import('./resources')
  },
  {
    path: 'resource/info',
    name: 'resources.info',
    meta: {
      requiresAuth: true
    },
    component: () => import('./info')
  },
  {
    path: 'resource/create',
    name: 'resource.create',
    meta: {
      requiresAuth: true
    },
    component: () => import('./create')
  }
]
