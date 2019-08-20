export default [
  {
    path: 'task/tasks',
    name: 'task.tasks',
    meta: {
      requiresAuth: true
    },
    component: () => import('./tasks')
  },
  {
    path: 'task/info/:id',
    name: 'task.info',
    meta: {
      requiresAuth: true
    },
    component: () => import('./info')
  },
  {
    path: 'task/shop',
    name: 'task.shop',
    meta: {
      requiresAuth: true
    },
    component: () => import('./shop')
  },
  {
    path: 'task/fulfill/:id',
    name: 'task.fulfill',
    meta: {
      requiresAuth: true
    },
    component: () => import('./fulfill')
  },
  {
    path: 'task/showimg/:thumb',
    name: 'task.showimg',
    meta: {
      requiresAuth: true
    },
    component: () => import('./showimg')
  }
]
