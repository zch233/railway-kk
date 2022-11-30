<script setup name="SettingCopy">
import copy from 'copy-to-clipboard';
import { message } from 'ant-design-vue';
import { useStoreSetting } from '@src/store/modules/setting';
import { GupoAlert } from '@src/components/UI';

const storeSetting = useStoreSetting();

const handleCopy = () => {
    copy(`${JSON.stringify(storeSetting.theme, null, 4)}\n${JSON.stringify(storeSetting.initSettings, null, 4)}`);
    message.success('复制成功');
};
</script>

<template>
    <div class="setting-copy">
        <GupoAlert message="点击复制配置，需覆盖到 src\store\modules\setting.js 中 initTheme、settings 变量中" type="warning" @click="handleCopy" />
    </div>
</template>

<style scoped lang="less">
.setting-copy {
    .ant-alert {
        cursor: pointer;
        opacity: 0.8;
        user-select: none;
    }
}
</style>
