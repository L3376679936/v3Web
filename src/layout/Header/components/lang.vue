<template>
    <el-dropdown @command="handleCommand">
        <svg-icon icon="language"></svg-icon>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="zh" :disabled="currentLanguage === 'zh'">中文</el-dropdown-item>
                <el-dropdown-item command="en" :disabled="currentLanguage === 'en'">English</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue';
import { useStore } from 'vuex';

const i18n = useI18n()
const store = useStore()

// 当前语言
const currentLanguage = computed(() => {
    return i18n.locale.value
})

// 语言切换
const handleCommand = (val) => {
    i18n.locale.value = val //真正改变语言的地方
    store.commit('app/changeLang', val)
    localStorage.setItem('lang', val)
}

</script>

<style scoped></style>