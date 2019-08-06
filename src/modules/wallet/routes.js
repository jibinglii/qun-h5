export default [{
        path: 'wallet/wallet',
        name: 'wallet.wallet',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./wallet')
    },
    {
        path: 'wallet/recharge',
        name: 'wallet.recharge',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./recharge')
    },
    {
        path: 'wallet/invoice',
        name: 'wallet.invoice',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./invoice')
    },
    {
        path: 'wallet/invoiceinfo',
        name: 'wallet.invoiceinfo',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./invoiceInfo')
    },
    {
        path: 'wallet/invoiceapply',
        name: 'wallet.invoiceapply',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./invoiceApply')
    },
]