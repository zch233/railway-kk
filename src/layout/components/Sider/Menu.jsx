import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { SubMenu as ASubMenu, MenuItem as AMenuItem } from 'ant-design-vue';
import MenuItem from './MenuItem.jsx';

export default defineComponent({
    name: 'Menu',
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const router = useRouter();

        return () =>
            props.data.children?.length ? (
                <ASubMenu key={props.data.path} title={<MenuItem data={props.data?.meta} />}>
                    {props.data.children.map(item => (
                        <Menu data={item} />
                    ))}
                </ASubMenu>
            ) : (
                <AMenuItem key={props.data.path} onClick={() => router.push(props.data.path)}>
                    <MenuItem data={props.data?.meta} />
                </AMenuItem>
            );
    },
});
