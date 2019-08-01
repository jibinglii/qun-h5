export default [{
    path: 'history/history',
    name: 'history.history',
    meta: {
        requiresAuth: true
    },
    component: () =>
        import ('./history')
}]