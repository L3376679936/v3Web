<template>
  <div>goods</div>
  <el-button type="primary" @click="getGoodsLists" >请求</el-button>
</template>

<script setup>
import { getGoodsList} from '@/api/goodsApi/goodsApi.js'


const getGoodsLists = () => {
  getGoodsList().then(res => {
    console.log(res)
  })
}

 
</script>

<style lang="scss" scoped></style>
