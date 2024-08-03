<template>
  <div class="box">
    <div class="search color flex">
      <div>操作记录</div>
      <div>{{'总条数：'+recardAbout.totalCount}}</div>
    </div>
    <el-table :data="recardAbout.tableData" class="eltable" style="width: 90%">
      <el-table-column fixed prop="id" label="ID" min-width="120" />
      <el-table-column prop="user_name" label="操作用户" min-width="120" />
      <el-table-column label="操作类型" min-width="120" >
      <template #default="scope">
        <el-tag type="primary" v-if="scope.row.type=='ADD'">新增</el-tag>
        <el-tag type="success" v-if="scope.row.type=='UPDATE'">修改</el-tag>
        <el-tag type="danger" v-if="scope.row.type=='DEL'">删除</el-tag>
      </template>
      </el-table-column>
      <el-table-column prop="goods_about" label="操纵货物" min-width="120" />
      <el-table-column prop="createTime" label="操作时间" min-width="220" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { GetRecord } from '@/apis/recardApis'
import { ref, onMounted, reactive } from 'vue'

const recardAbout = reactive({
  tableData:[],
  totalCount:0
})

const getRecord = async()=>{
  const {data,totalCount} = await GetRecord()
  console.log(data)
  recardAbout.tableData = data
  recardAbout.totalCount = totalCount
}
onMounted(() => {
  getRecord()
})
</script>

<style lang="scss" scoped>
.box {
  .search {
    height: 100px;
    padding: 0 6%;
    justify-content: space-between;
    align-items: center;
    .input {
      width: 300px;
    }
  }
  .eltable {
    height: calc(100vh - 140px);
    margin: 0 auto;
  }
}
.modal {
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: #ececedbd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .change{
    width: 400px;
    height: 450px;
    padding: 20px;
    margin: 20px 0;
    color: var(--color-text-primary);
    background-color: #fff;
    .input{
        height: 50px;
        margin: 10px 0;
    }
  }
}
</style>
