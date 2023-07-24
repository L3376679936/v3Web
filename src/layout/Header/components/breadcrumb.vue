<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadcurmbList" :key="index" :to="{ path: `/${item.name}` }">
            <span>{{ $t(`menus.${item.name}`) }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()

const breadcurmbList = ref([])

const initBreadcurmbList = () => {
    breadcurmbList.value = route.matched
}

// 对路由进行深度监听，路由变化将新路由加到面包屑数组中
watch(
    route,
    () => {
        initBreadcurmbList()
    },
    {
        deep: true,
        immediate: true
    }
)
</script>

<style scoped></style>
