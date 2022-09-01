import dayjs from 'dayjs';

export const configData = () => {
    const searchData = reactive({
        formData: {
            time_frame: [],
            keyword: '',
            type: undefined,
            area: undefined,
            is_open: undefined,
        },
        configItem: [
            {
                key: 'keyword',
                type: 'input',
                props: {
                    placeholder: 'B超单号',
                },
            },
            {
                key: 'keyword',
                type: 'input',
                props: {
                    placeholder: '姓名',
                },
            },
            {
                key: 'type',
                type: 'select',
                props: {
                    placeholder: '地址',
                    options: [],
                },
            },
            {
                key: 'time_frame',
                type: 'datePicker.rangePicker',
                props: {
                    disabledDate: current => current && current > dayjs().endOf('day'),
                    valueFormat: 'YYYY-MM-DD',
                    placeholder: ['检查开始时间', '检查结束时间'],
                },
            },
        ],
    });
    return { searchData };
};

export const columns = [
    {
        title: 'B超单号',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '性别',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '患者号',
        dataIndex: 'area',
        key: 'area',
    },
    {
        title: '手机号',
        dataIndex: 'is_open',
        key: 'is_open',
    },
    {
        title: '证件号',
        dataIndex: 'users_count',
        key: 'users_count',
    },
    {
        title: '居住地',
        dataIndex: 'created_at',
        key: 'created_at',
    },
    {
        title: '检查时间',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
    },
    {
        title: '报告结果',
        dataIndex: 'created_at',
        key: 'created_at',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
    },
];
