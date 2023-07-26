<template>
  <el-form :inline="true" :model="goodsForm" label-width="120px" class="demo-form-inline">
    <el-row>
      <el-col :span="6">
        <el-form-item label="商品名称">
          <!-- <el-select v-model="goodsForm.product_name" placeholder="请选择要查询的商品" clearable>
            <el-option v-for="item in productList" :key="item.id" :label="item.name" :value="item.name" />
          </el-select> -->
          <el-input v-model="goodsForm.product_name" placeholder="请输入商品名称" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="生产日期">
          <el-date-picker v-model="goodsForm.date_created" type="datetime" placeholder="请选择日期" clearable
            format="YYYY/MM/DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss" />
        </el-form-item>
      </el-col>
      <el-col :span="6" :push="4">
        <el-button  type="primary" @click="doSearch('1')" >
          查询
        </el-button>
        <el-button   @click="doSearch('2')" >
          清空
        </el-button>
      </el-col>
    </el-row>



  </el-form>
  <el-table v-loading="loading"  :data="tableData" stripe border style="width: 100%">
    <el-table-column v-for="item in columnList" :key="item.prop" :prop="item.prop" :label="item.label"
      :formatter="item.formatter ? item.formatter : null" :width="item.width" align="center" /> 
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary"  @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger"  @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
</template>

<script setup>
import { getGoodsList, getProductList,delGoods } from '@/api/goodsApi/goodsApi.js'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const goodsForm = ref({
  product_name: '',
  date_created: ''
})

let productList = ref([])
let loading = ref(true)
const tableData = ref([])
const columnList = ref([
  {
    prop: 'product_name',
    label: '商品名称',
  },
  {
    prop: "date_created",
    label: "生产日期",
    formatter: (row) => dayjs(row.date_created).format('YYYY-MM-DD HH:mm:ss')

  },
  {
    prop: "unit_price",
    label: "商品单价",
  },
  {
    prop: "goods_repertory",
    label: "商品库存",
  },
  {
    prop: "production_address",
    label: "厂家地址",
    width: 500
  }
])

// 商品列表（表格）
const getGoodsLists = () => {
  getGoodsList(goodsForm.value).then(res => {
    tableData.value = res.data
    loading.value = false
  })
}
// 商品名字下拉框
const getProductLists = () => {
  getProductList().then(res => {
    productList.value = res.data

  })
}
// 查询按钮
const doSearch = (flag) => {
  // console.log(goodsForm.value)
  if (flag === '2') {
    goodsForm.value = {
      product_name: '',
      date_created: ''
    }
  }
  loading.value=true
  getGoodsLists()
}
// 编辑按钮
const handleEdit = (row) => {
  console.log(row)
}
// 删除按钮
const handleDelete = (row) => {
  console.log(row)
  delGoods({product_id:row.product_id}).then(res=>{
    console.log(res)
    ElMessage.success(res.meta.msg)
    loading.value=true
    getGoodsLists()
  })
}


getProductLists()

// 进入页面发生请求
getGoodsLists()
console.log(tableData.value)


</script>

<style lang="scss" scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
