import { defineComponent } from 'vue';
import Icon from '@ant-design/icons-vue';
import GlobalIcon from '@src/components/GlobalIcon';

export default defineComponent({
    name: 'LayoutMenuItem',
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        return () => (
            <div class='menu-item'>
                {props.data?.icon && <Icon component={<GlobalIcon name={props.data?.icon} />} />}
                <span>{props.data?.title}</span>
            </div>
        );
    },
});
