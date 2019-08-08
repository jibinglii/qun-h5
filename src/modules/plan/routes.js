export default [{
        path: 'plan/plan/:active?',
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
        path: 'plan/serving/:id',
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
        path: 'plan/planingdetails/:id',
        name: 'plan.planingdetails',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./planingDetails')
    },
    {
        path: 'plan/romotion/:id',
        name: 'plan.romotion',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./romotion')
    }
]