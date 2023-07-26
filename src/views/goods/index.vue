<template>
  <el-form :inline="true" :model="goodsForm" label-width="80px" class="demo-form-inline">
    <el-row>
      <el-col :span="6">
        <el-form-item label="商品名称:">
          <!-- <el-select v-model="goodsForm.product_name" placeholder="请选择要查询的商品" clearable>
            <el-option v-for="item in productList" :key="item.id" :label="item.name" :value="item.name" />
          </el-select> -->
          <el-input v-model="goodsForm.product_name" placeholder="请输入商品名称" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="生产日期:">
          <el-date-picker v-model="goodsForm.date_created" type="datetime" placeholder="请选择日期" clearable
            format="YYYY/MM/DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="价格:">
          <el-input-number v-model="goodsForm.unit_priceStart" class="mx-4" style="width: 80px;" :min="0" placeholder="最低价"
            :controls="false" />
          <span style="margin: 0 5px;">~</span>

          <el-input-number v-model="goodsForm.unit_priceEnd" class="mx-4" :min="0" style="width: 80px;" placeholder="最高价"
            :controls="false" />
        </el-form-item>
      </el-col>





      <el-col :span="6" >
        <el-button type="primary" @click="doSearch('1')">
          查询
        </el-button>
        <el-button @click="doSearch('2')">
          清空
        </el-button>
      </el-col>
    </el-row>



  </el-form>
  <el-table height="500" v-loading="loading" :data="tableData" stripe border style="width: 100%">
    <el-table-column v-for="item in columnList" :key="item.prop" :prop="item.prop" :label="item.label"
      :formatter="item.formatter ? item.formatter : null" :width="item.width" align="center" />
    <el-table-column label="操作" align="center" width="300">
      <template #default="scope">
        <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</template>

<script setup>
import { getGoodsList, getProductList, delGoods } from '@/api/goodsApi/goodsApi.js'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const goodsForm = ref({
  product_name: '',
  date_created: '',
  unit_priceStart:undefined,
  unit_priceEnd:undefined
})

let currentPage4 = ref(1)
let pageSize4 = ref(100)
let small = ref(false)
let background = ref(false)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}

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
    width:200,
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
    width: 320
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
  loading.value = true
  getGoodsLists()
}
// 编辑按钮
const handleEdit = (row) => {
  console.log(row)
}
// 删除按钮
const handleDelete = (row) => {
  console.log(row)
  delGoods({ product_id: row.product_id }).then(res => {
    console.log(res)
    ElMessage.success(res.meta.msg)
    loading.value = true
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
