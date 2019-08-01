export default [{
        path: 'plan/plan',
        name: 'plan.plan',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./plan')
    },
    {
        path: 'plan/plandetails/:id',
        name: 'plan.plandetails',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./planDetails')
    },
    {
        path: 'plan/serving',
        name: 'plan.serving',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./serving')
    },
    {
        path: 'plan/totalview',
        name: 'plan.totalview',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./totals')
    },
    {
        path: 'plan/planingdetails/:id.html',
        name: 'plan.planingdetails',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./planingDetails')
    },
    {
        path: 'plan/romotion',
        name: 'plan.romotion',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./romotion')
    }
]