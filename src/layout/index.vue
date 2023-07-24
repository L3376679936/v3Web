<template>
    <el-container class="app-wrapper">
        <el-aside class="sidebar-container" :width="asideWidth">
            <Menu />
        </el-aside>
        <el-container class="container" :class="{ hidderContainer: !store.getters.siderType }">
            <el-header>
                <Header />
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import Menu from "./Menu";
import Header from "./Header";
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()
// 没有解决scss局部引入问题，暂时用变量代替
const sideBarWidth = '210px'
const hideSideBarWidth = '67px'
const asideWidth = computed(() => {
    return store.getters.siderType ? sideBarWidth : hideSideBarWidth
})


</script>

<style lang="scss" scoped>
.app-container {
    position: relative;
    width: 100%;
    height: 100%;

}

.container {
    width: calc(100% - $sideBarWidth);
    height: 100%;

    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    transition: all 0.28s;

    &.hidderContainer {
        width: calc(100% - $hideSideBarWidth);
    }
}

::v-deep .el-header {
    padding: 0;
}
</style>