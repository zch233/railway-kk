export const configData = () => {
    const documentForm = {
        formData: reactive({
            name: '',
            descpt: '',
            select: undefined,
        }),
        rules: {
            name: {
                required: true,
                message: '请输入文献名称',
                trigger: 'blur',
            },
        },
        configItem: [
            {
                key: 'name',
                label: '文献名称',
                type: 'input',
            },
            {
                key: 'select',
                label: '文献名称',
                type: 'select',
                props: {
                    options: [],
                },
            },
            {
                key: 'descpt',
                label: '描述',
                type: 'input.textarea',
                props: {
                    showCount: true,
                    maxlength: 100,
                },
            },
        ],
    };
    return { documentForm };
};
