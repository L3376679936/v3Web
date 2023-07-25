<template>
    <el-dropdown>
        <span style="display: inline-block;" class="el-dropdown-link">
        <span class="username" >{{store.state.app.userInfo.account}}</span>
            <el-avatar shape="circle" :size="40" :src="imgUrl" />
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout()">退出</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { ref } from "vue"
import { useStore } from "vuex";
const store = useStore()
const imgUrl = ref("https://tse2-mm.cn.bing.net/th/id/OIP-C.A_Km4cElDCdcxuTd5qPAHQAAAA?w=201&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7")

const logout = () => {
    store.dispatch('app/logout')
}
</script>

<style scoped>
::v-deep .el-dropdown-menu__item {
    white-space: nowrap;
}
.username{
    display: inline-block;
    /* line-height: 40px; */
    /* padding-bottom: 20px; */
    transform: translateY(-70%);
    margin-right: 15px;
    font-size: 18px;
    color:skyblue;
}
</style>