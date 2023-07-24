<template>
    <div @click="handleScreenFull" id="screenfull">
        <svg-icon :icon="icon ? 'exit-fullscreen' : 'fullscreen'"></svg-icon>
    </div>
</template>

<script setup>
import screenfull from 'screenfull'
import { onMounted, onBeforeUnmount, ref } from 'vue';

const icon = ref(screenfull.isFullscreen)

const handleScreenFull = () => {
    if (screenfull.isEnabled) {
        screenfull.toggle()
    }
}

const changeIcon = () => {
    icon.value = screenfull.isFullscreen
}

onMounted(() => {
    screenfull.on('change', changeIcon)
})
onBeforeUnmount(() => {
    screenfull.off('change')
})
</script>

<style scoped></style>