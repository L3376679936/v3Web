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
          <el-input-number v-model="goodsForm.unit_priceStart" class="mx-4" style="width: 80px;" :min="0"
            placeholder="最低价" :controls="false" />
          <span style="margin: 0 5px;">~</span>

          <el-input-number v-model="goodsForm.unit_priceEnd" class="mx-4" :min="0" style="width: 80px;" placeholder="最高价"
            :controls="false" />
        </el-form-item>
      </el-col>





      <el-col :span="6">
        <el-button type="primary" :icon="Search" @click="doSearch('1')">
          查询
        </el-button>
        <el-button type="info" :icon="Refresh" @click="doSearch('2')">
          清空
        </el-button>
        <el-button :icon="CirclePlus" @click="doAdd">
          新增
        </el-button>
      </el-col>
    </el-row>



  </el-form>
  <el-table height="550" v-loading="loading" :data="tableData" stripe border style="width: 100%">
    <el-table-column v-for="item in columnList" :key="item.prop" :prop="item.prop" :label="item.label"
      :formatter="item.formatter ? item.formatter : null" :width="item.width" align="center" />
    <el-table-column label="操作" align="center" width="300">
      <template #default="scope">
        <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog center v-model="dialogVisible" :title="dialogTitle" width="30%" draggable>
    <el-form :model="dialogForm" label-width="80px" class="demo-form-inline">
      <el-row>
        <el-form-item label="商品名称:">
          <el-input v-model="dialogForm.product_name" placeholder="请输入商品名称" style="width: 280px;" clearable />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="生产日期:">
          <el-date-picker v-model="dialogForm.date_created" type="datetime" placeholder="请选择日期" clearable
            style="width: 280px;" format="YYYY/MM/DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="价格:">
          <el-input-number v-model="dialogForm.unit_price" :min="0" placeholder="请输入价格" style="width: 280px;"
            :controls="false" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="库存:">
          <el-input-number v-model="dialogForm.goods_repertory" :min="0" placeholder="请输入库存" style="width: 280px;"
            :controls="false" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="地址:">
          <el-input v-model="dialogForm.production_address" :min="0" placeholder="地址" style="width: 280px;"
            :controls="false" />
        </el-form-item>
      </el-row>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="doIsEdit">确认提交</el-button>
        <el-button type="primary" @click="dialogVisible = false">取 消
        </el-button>
      </span>
    </template>
  </el-dialog>



  <div style="height: 50px;display:flex; justify-content: center;"> <el-pagination
      v-model:current-page="pagination.currentPage" v-model:page-size="pagination.pageSize"
      :page-sizes="[10, 20, 50, 100]" small background layout="total, sizes, prev, pager, next, jumper"
      :total="totalNumber" @size-change="handleSizeChange" @current-change="handleCurrentChange" /></div>
</template>

<script setup>
import { getGoodsList, getProductList, delGoods, editGoods,addGoods } from '@/api/goodsApi/goodsApi.js'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { Search, Refresh, CirclePlus } from '@element-plus/icons-vue'


let dialogVisible = ref(false)
let dialogTitle = ref('编辑商品')
let dialogForm = ref({
  product_name: '',
  date_created: '',
  unit_price: undefined,
  goods_repertory: undefined,
  production_address: ''
})

const doIsEdit = (data) => {
  // console.log(dialogForm.value,'dialogForm.value')
  if (dialogTitle.value !== '新增商品') {
    editGoods(dialogForm.value).then(res => {
      // console.log(res)
      ElMessage.success(res.meta.msg)
      dialogVisible.value = false

    })
  } else {
    addGoods(dialogForm.value).then(res => {
      console.log(res)
      ElMessage.success(res.meta.msg)
      dialogVisible.value = false
    })


  }
  getGoodsLists()


}
const doAdd = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增商品'
  dialogForm.value = {
    product_name: '',
    date_created: '',
    unit_price: undefined,
    goods_repertory: undefined,
    production_address: ''
  }
}






const goodsForm = ref({
  product_name: '',
  date_created: '',
  unit_priceStart: undefined,
  unit_priceEnd: undefined
})
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
})
let totalNumber = ref(0)

const handleSizeChange = (val) => {
  pagination.value.pageSize = val
  loading.value = true
  getGoodsLists()
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  loading.value = true
  console.log(`current page: ${val}`)
  getGoodsLists()
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
    width: 200,
    formatter: (row) => dayjs(row.date_created).format('YYYY-MM-DD HH:mm:ss')

  },
  {
    prop: "unit_price",
    label: "商品单价",
    formatter: (row) => `${row.unit_price}元`
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
  getGoodsList({ ...goodsForm.value, ...pagination.value }).then(res => {
    tableData.value = res.data
    loading.value = false
    totalNumber = res.total
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
  dialogForm.value = row
  dialogForm.value.date_created = dayjs(row.date_created).format('YYYY-MM-DD HH:mm:ss')
  dialogVisible.value = true
  dialogTitle.value = '编辑商品'
  // console.log(row)
}
// 删除按钮
const handleDelete = (row) => {
  // console.log(row)
  delGoods({ product_id: row.product_id }).then(res => {
    // console.log(res)
    ElMessage.success(res.meta.msg)
    loading.value = true
    getGoodsLists()
  })
}


getProductLists()

// 进入页面发生请求
getGoodsLists()
// console.log(tableData.value)


</script>

<style lang="scss" scoped>
.demo-form-inline {
  margin-left: 40px;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}

::v-deep .el-input-number .el-input__inner {
  text-align: left !important;
}
</style>
