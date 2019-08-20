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
    path: 'resource/info/:id',
    name: 'resource.info',
    meta: {
      requiresAuth: true
    },
    component: () => import('./info')
  },
  {
    path: 'resource/create/:id?',
    name: 'resource.create',
    meta: {
      requiresAuth: true
    },
    component: () => import('./create')
  },
  {
    path: 'resource/search',
    name: 'resource.search',
    meta: {
      requiresAuth: true
    },
    component: () => import('./search')
  }
]
