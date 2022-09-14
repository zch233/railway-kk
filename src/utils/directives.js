import { useStorePermission } from '@src/store/modules/permission.js';

export const permissionDirective = app => {
    app.directive('permission', {
        mounted(el, binding) {
            const storePermission = useStorePermission();
            if (!storePermission.permission.includes(binding.value)) el.parentNode.removeChild(el);
        },
    });
};
