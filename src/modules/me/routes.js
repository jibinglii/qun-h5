export default [{
        path: 'me/me',
        name: 'me.me',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./me')
    },
    {
        path: 'me/accountsetting',
        name: 'me.accountsetting',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./accountSetting')
    },
    {
        path: 'me/modifyuseinfo',
        name: 'me.modifyuseinfo',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./modifyUseInfo')
    },
    {
        path: 'me/edit-pay-pwd',
        name: 'me.edit-pay-pwd',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./EditPayPwd')
    },
    {
        path: 'me/set-pay-pwd',
        name: 'me.set-pay-pwd',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./SetPayPwd')
    },
    {
        path: 'me/help',
        name: 'me.helps',
        meta: {
            requiresAuth: false
        },
        component: () =>
            import ('./Help')
    },
    {
        path: 'me/helpflow',
        name: 'me.helps.flow',
        meta: {
            requiresAuth: false
        },
        component: () =>
            import ('./HelpFlow')
    },
    {
        path: 'me/help/view/:id.html',
        name: 'me.helps.view',
        meta: {
            requiresAuth: false
        },
        component: () =>
            import ('./HelpInfo')
    },
    {
        path: 'me/help/list/:id.html',
        name: 'me.helps.list',
        meta: {
            requiresAuth: false
        },
        component: () =>
            import ('./HelpList')
    },
    {
        path: 'me/help/feedback.html',
        name: 'me.feedback',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./Feedback')
    },
    {
        path: 'me/settlemanage',
        name: 'me.settlemanage',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./settleManage')
    },
    {
        path: 'me/datastatis',
        name: 'me.datastatis',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./dataStatis')
    },
    {
        path: 'me/datastatisflow',
        name: 'me.datastatis.flow',
        meta: {
            requiresAuth: true
        },
        component: () =>
            import ('./dataStatisFlow')
    },
]