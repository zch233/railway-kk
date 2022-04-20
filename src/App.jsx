import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

export default defineComponent({
    name: 'App',
    setup() {
        return () => (
            <div>
                <p>
                    <RouterLink to={'/'}>Home </RouterLink>|<RouterLink to={'/about'}> About </RouterLink>|<RouterLink to={'/homeAgain'}> HomeAgain</RouterLink>
                </p>
                <RouterView />
            </div>
        );
    },
});
