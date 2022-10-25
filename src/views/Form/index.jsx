import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { Tooltip, Button } from 'ant-design-vue';
import { PlusOutlined, LoadingOutlined, InboxOutlined } from '@ant-design/icons-vue';

export const useDataSync = params => {
    const addFrom = {
        formData: reactive({
            name: '',
            password: '',
            special: '',
            textarea: '',
            percent: 10,
            datePicker: '',
            rangePicker: [],
            timePicker: '',
            timeRangePicker: [],
            rate: 0,
            slider: 0,
            treeSelect: undefined,
            radio: '',
            checkbox: [],
            cascader: [],
            select: undefined,
            switch: true,
            uploadList: [],
            uploadList2: [],
            uploadList3: [],
            dragger: [],
        }),
        rules: {
            name: {
                required: true,
                message: '请输入机构名称',
                trigger: 'blur',
            },
            select: {
                required: true,
                message: '请选择选项',
                trigger: 'change',
            },
        },
        // 如果configItem需要响应式同formData加上reactive
        configItem: () => [
            {
                key: 'name',
                label: '输入框',
                type: 'input',

                // 配置Form.Item，这个配置项用的情況比较少
                formItemProps: {
                    labelAlign: 'right',
                },
            },
            {
                key: 'password',
                label: '密码',
                type: 'input.password',
            },
            {
                key: 'special',
                label: (
                    <Tooltip title='用户说明'>
                        <span>用户 </span>
                        <QuestionCircleOutlined />
                    </Tooltip>
                ),
                type: 'input',
            },
            {
                key: 'textarea',
                label: '文本域',
                type: 'input.textarea',
                props: {
                    maxlength: 100,
                    showCount: true,
                    autoSize: {
                        minRows: 2,
                        maxRows: 3,
                    },
                },
            },
            {
                key: 'percent',
                label: '百分比',
                type: 'inputNumber',
                props: {
                    // 自定义宽度
                    style: {
                        width: '100px',
                    },
                    formatter: value => `${value}%`,
                    min: 0,
                    max: 100,
                },
            },
            {
                key: 'datePicker',
                label: '日期选择',
                type: 'datePicker',
                props: {
                    valueFormat: 'YYYY-MM-DD',
                },
            },
            {
                key: 'rangePicker',
                label: '日期范围选择',
                type: 'datePicker.rangePicker',
                props: {
                    valueFormat: 'YYYY-MM-DD HH:mm:ss',
                },
            },
            {
                key: 'timePicker',
                label: '时间选择',
                type: 'timePicker',
                props: {
                    valueFormat: 'HH:mm:ss',
                },
            },
            {
                key: 'timeRangePicker',
                label: '时间范围选择',
                type: 'timePicker.timeRangePicker',
                props: {
                    valueFormat: 'HH:mm:ss',
                },
            },
            {
                key: 'select',
                label: '选择器',
                type: 'select',
                props: {
                    // 是否可搜索，自己后加的
                    showSearch: true,

                    fieldNames: {
                        label: 'name',
                        value: 'code',
                    },

                    options: params.addressOption,
                },
            },
            {
                key: 'cascader',
                label: '级联',
                type: 'cascader',
                props: {
                    // 是否可搜索，自己后加的
                    showSearch: true,

                    changeOnSelect: true,
                    options: [
                        {
                            value: 'zhejiang',
                            label: 'Zhejiang',
                            children: [
                                {
                                    value: 'hangzhou',
                                    label: 'Hangzhou',
                                    children: [
                                        {
                                            value: 'xihu',
                                            label: 'West Lake',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            value: 'jiangsu',
                            label: 'Jiangsu',
                            children: [
                                {
                                    value: 'nanjing',
                                    label: 'Nanjing',
                                },
                            ],
                        },
                    ],
                },
            },
            {
                key: 'treeSelect',
                label: '树选择',
                type: 'treeSelect',
                props: {
                    treeData: [
                        {
                            title: 'parent 1',
                            value: 'parent 1',
                            children: [
                                {
                                    title: 'parent 1-0',
                                    value: 'parent 1-0',
                                    children: [
                                        {
                                            title: 'my leaf',
                                            value: 'leaf1',
                                        },
                                        {
                                            title: 'your leaf',
                                            value: 'leaf2',
                                        },
                                    ],
                                },
                                {
                                    title: 'parent 1-1',
                                    value: 'parent 1-1',
                                },
                            ],
                        },
                    ],
                },
            },
            {
                key: 'radio',
                label: '单选',
                type: 'radio',
                props: {
                    options: [
                        {
                            label: 'Apple',
                            value: 'Apple',
                        },
                        {
                            label: 'Pear',
                            value: 'Pear',
                        },
                    ],
                },
            },
            {
                key: 'checkbox',
                label: '多选框',
                type: 'checkbox',
                props: {
                    options: [
                        {
                            label: 'Apple',
                            value: 'Apple',
                        },
                        {
                            label: 'Pear',
                            value: 'Pear',
                        },
                    ],
                },
            },
            {
                key: 'rate',
                label: '评分',
                type: 'rate',
            },
            {
                key: 'slider',
                label: '滑块',
                type: 'slider',
            },
            {
                key: 'switch',
                label: '开关',
                type: 'switch',
            },
            {
                key: 'uploadList',
                label: '图片上传',
                type: 'upload',
                props: {
                    // uploadContent: '上传', //方式一
                    // uploadContent: () => <div>上传</div>, //方式二
                    uploadContent: (
                        <div>
                            <span>自定义样式 </span>
                            <Button>上传文件</Button>
                        </div>
                    ),
                    name: 'file',
                    action: 'http://10.123.234.66:20060/api/upload',
                },
            },
            {
                key: 'uploadList2',
                label: '头像上传',
                type: 'upload',
                props: {
                    uploadContent: () => {
                        if (params.imageUrl) {
                            return <img src={params.imageUrl} alt='avatar' style={{ height: '100%' }} />;
                        } else {
                            return (
                                <div>
                                    {params.uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
                                    <div class='ant-upload-text'>上传图片</div>
                                </div>
                            );
                        }
                    },
                    name: 'file',
                    action: 'http://10.123.234.66:20060/api/upload',
                    listType: 'picture-card',
                    showUploadList: false,
                    accept: 'image/*',
                    maxCount: 1,
                    onChange: info => params.uploadChange(info),
                },
            },
            {
                key: 'uploadList3',
                label: '多图片上传',
                type: 'upload',
                props: {
                    uploadContent: () => (
                        <div>
                            <PlusOutlined />
                            <div class='ant-upload-text'>上传图片</div>
                        </div>
                    ),
                    name: 'file',
                    action: 'http://10.123.234.66:20060/api/upload',
                    listType: 'picture-card',
                    multiple: true,
                },
            },
            {
                key: 'dragger',
                label: '文件拖拽上传',
                type: 'upload.dragger',
                props: {
                    uploadContent: () => (
                        <div>
                            <p class='ant-upload-drag-icon'>
                                <InboxOutlined />
                            </p>
                            <p class='ant-upload-text'>单击或将文件拖动到此区域以上传</p>
                            <p class='ant-upload-hint'>文件提示</p>
                        </div>
                    ),
                    name: 'file',
                    action: 'http://10.123.234.66:20060/api/upload',
                    multiple: true,
                },
            },
            // 配置按钮
            {
                type: 'operation',
                submitButton: {
                    text: '提交',
                    type: 'primary',
                },
                cancelButton: {
                    text: '取消',
                },
            },
        ],
    };
    return { addFrom };
};
