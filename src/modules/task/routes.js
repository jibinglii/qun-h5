export default [
  {
    path: 'task/tasks',
    name: 'task.tasks',
    meta: {
      requiresAuth: true
    },
    component: () => import('./tasks')
  }
]
