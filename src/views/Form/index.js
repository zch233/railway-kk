export const useDataSync = () => {
    const addFrom = {
        formData: reactive({
            name: '',
        }),
        rules: {
            name: {
                required: true,
                message: '请输入机构名称',
                trigger: 'change',
            },
        },
        // 如果configItem需要响应式同formData加上reactive
        configItem: [
            {
                key: 'name',
                label: '机构名称',
                type: 'input',
                props: {},
            },
            {
                key: 'name',
                label: '机构名称',
                type: 'input',
                props: {},
            },
            {
                key: 'name',
                label: '机构名称',
                type: 'input',
                props: {},
            },
            {
                key: 'name',
                label: '机构名称',
                type: 'input',
                props: {},
            },
            {
                key: 'name',
                label: '机构名称',
                type: 'input',
                props: {},
            },
            // 配置按钮
            {
                type: 'operation',
                submitButton: {
                    text: '提交',
                    // type: 'primary',
                },
                cancelButton: {
                    text: '取消',
                },
            },
        ],
    };
    return { addFrom };
};
