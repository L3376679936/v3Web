<template>
    <el-menu active-text-color="#ffd04b" background-color="#304156" class="el-menu-vertical-demo"
        :default-active="defaultActive" text-color="#fff" router unique-opened :collapse="!$store.getters.siderType">
        <el-sub-menu :index="item.id" v-for="(item, index) in menusList.data" :key="item.id">
            <template #title>
                <el-icon>
                    <component :is="iconList[index]"></component>
                </el-icon>
                <span>{{ item.authName }}</span>
            </template>
            <el-menu-item :index="'/' + it.path" v-for="it in item.children" :key="it.id" @click="savePath(it.path)">
                <template #title>
                    <el-icon>
                        <component :is="icon"></component>
                    </el-icon>
                    <span>{{ $t(`menus.${it.path}`) }}</span>
                </template>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import store from '@/store';
import { ref } from 'vue'

// 图标
const iconList = ref(['shop', 'tickets', 'setting', 'user', 'pie-chart'])
const icon = ref('menu')

// 左侧菜单栏数据
const menusList = ref([])
// 获取左侧菜单栏的数据
const initMenuList = async () => {
    menusList.value = await menuList()
    console.log(menusList.value)
}

// 路由重定向
const defaultActive = ref(sessionStorage.getItem('path') || '/goods')
const savePath = (path) => {
    sessionStorage.setItem('path', `/${path}`)
}

initMenuList()
</script>

<style scoped></style>
