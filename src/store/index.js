import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import SecureLS from 'secure-ls';
import { isDevMode } from '@src/utils';

// https://github.com/softvar/secure-ls
const ls = new SecureLS({ isCompression: false }); // 默认使用 Base64 编码

const store = createPinia().use(
    createPersistedState({
        storage: isDevMode()
            ? undefined
            : {
                  getItem: key => ls.get(key),
                  setItem: (key, value) => ls.set(key, value),
              },
    })
);

export default store;
