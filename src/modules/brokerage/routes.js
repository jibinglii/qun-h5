export default [
  {
    path: 'brokerage/brokerage',
    name: 'brokerage',
    meta: {
      requiresAuth: true
    },
    component: () => import('./brokerage')
  }
]
