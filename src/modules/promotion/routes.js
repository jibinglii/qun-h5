export default [{
        path: 'promotion/promotion',
        name: 'promotion.promotion-content',
        // meta: {
        //     requiresAuth: true
        // },
        component: () =>
            import ('./promotion')
    },
    {
        path: 'promotion/details',
        name: 'promotion.details',
        // meta: {
        //     requiresAuth: true
        // },
        component: () =>
            import ('./details')
    },
    {
        path: 'promotion/edit',
        name: 'promotion.edit',
        // meta: {
        //     requiresAuth: true
        // },
        component: () =>
            import ('./edit')
    }
]