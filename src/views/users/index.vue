<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input :placeholder="$t('table.placeholder')" :v-model="queryForm.query">
        </el-input>
      </el-col>
      <el-button type="primary" :icon="Search">{{ $t('table.search') }}</el-button>
      <el-button type="primary">{{ $t('table.adduser') }}</el-button>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column :prop="item.prop" :label="$t(`table.${item.label}`)" v-for="(item, index) in options" :key="index">

        <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
          <el-switch v-model="row.mg_state" />
        </template>
        <template #default v-else-if="item.prop === 'action'">
          <el-button type="primary" size="small" :icon="Edit"></el-button>
          <el-button type="warning" size="small" :icon="Setting"></el-button>
          <el-button type="danger" size="small" :icon="Delete"></el-button>
        </template>

      </el-table-column>

    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import { Search, Edit, Delete, Setting } from '@element-plus/icons-vue'
import { userData } from '@/api/user'
import { options } from "./options.js"

const queryForm = ref({
  query: '',    //查询的参数
  pagenum: 1,   //当前页码
  pagesize: 2   //每页显示的条数
})

const tableData = ref([])

// 由于查询需要后端接口，不方便模拟，就直接展示了
// 有接口的时候需要传入参数queryForm.value
const initGetUsersList = async () => {
  const res = await userData()
  tableData.value = res.user
  console.log(res);
}
initGetUsersList();

</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 18px;
}
</style>
