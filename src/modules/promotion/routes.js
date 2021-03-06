export default [{
        path: 'promotion/promotion',
        name: 'promotion.promotion-content',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./promotion')
    },
    {
        path: 'promotion/details/:id',
        name: 'promotion.details',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./details')
    },
    {
        path: 'promotion/edit/:id?',
        name: 'promotion.edit',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./edit')
    },
    {
        path: 'promotion/add/:id?',
        name: 'promotion.add',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./add')
    },
    {
        path: 'promotion/addevent',
        name: 'promotion.addevent',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./addEvent')
    }
]