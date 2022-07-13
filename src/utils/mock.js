// 新版用户中心返回数据
export default {
    router: [
        {
            path: '/Overview',
            meta: {
                icon: 'overview',
                title: '概览',
            },
            children: [],
        },
        {
            path: '/Form',
            meta: {
                icon: 'form',
                title: '表单（Form）',
            },
            children: [],
        },
        {
            path: '/TableSearch',
            meta: {
                icon: 'table',
                title: '列表',
            },
            children: [
                {
                    path: '/Table',
                    meta: {
                        icon: '',
                        title: '表格（Table）',
                    },
                    children: [],
                },
                {
                    path: '/Search',
                    meta: {
                        icon: '',
                        title: '搜索（Search）',
                    },
                    children: [],
                },
            ],
        },
    ],
    button: [],
    otherPage: [
        {
            path: '/Table/Details',
            meta: {
                activeMenu: '/Table',
                showGoBack: true,
                title: '表格详情',
            },
        },
    ],
};
