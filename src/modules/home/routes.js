export default [
  {
    path: '/',
    name: 'home',
    component: () => import('./home')
  },
  {
    path: 'home/ad',
    name: 'home.ad',
    component: () => import('./ad')
  }
]
