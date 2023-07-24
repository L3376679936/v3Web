<template>
    <div class="navbar">
        <Hamburger />
        <Breadcrumb />
        <div class="navbar-right">
            <Dirver class="navbar-item" />
            <ScreenFull class="navbar-item" />
            <Lang class="navbar-item" />
            <Avatar />
        </div>

    </div>
</template>

<script setup>
import Hamburger from './components/hamburger.vue'
import Breadcrumb from './components/breadcrumb.vue'
import Avatar from './components/avatar.vue';
import Lang from './components/lang.vue';
import ScreenFull from './components/screenfull.vue';
import Dirver from './components/dirver/index.vue'
</script>

<style lang="scss" scoped>
.navbar {
    width: 100%;
    height: 3.75rem;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 .125rem .25rem rgba(0, 21, 41, 0.3);
    padding: 0 1rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    position: relative;

    .navbar-right {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        ::v-deep .navbar-item {
            display: inline-block;
            margin-right: 1.125rem;
            font-size: 1.375rem;
            color: #5a5e66;
            box-sizing: border-box;
            cursor: pointer;
        }
    }

}
</style>