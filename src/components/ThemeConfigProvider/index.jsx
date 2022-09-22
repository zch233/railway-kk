import { defineComponent } from 'vue';
import { useStoreSetting } from '@src/store/modules/setting';

export default defineComponent({
    name: 'ThemeConfigProvider',
    setup(props, context) {
        const setting = useStoreSetting();
        return () => <div style={Object.keys(setting.theme).reduce((res, key) => (res[key] = setting.theme[key]) && res, {})}>{context.slots?.default()}</div>;
    },
});
