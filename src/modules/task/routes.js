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
  }
]
