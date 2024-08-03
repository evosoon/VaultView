<template>
  <div class="box">
    <div class="search color flex">
      库存管理
      <el-input
        class="input"
        v-model="searchName"
        prefix-icon="Search"
        placeholder="搜索货物"
        @blur="getGoods"
        @keyup.enter="getGoods"
        clearable
      />
      <div v-show="(goodsAbout.totalCount != 0)">
        <span class="color">货品种类：</span>
        <span class="color" v-text="goodsAbout.totalCount"></span>
      </div>
    </div>
    <el-table :data="goodsAbout.tableData" class="eltable" style="width: 90%">
      <el-table-column fixed prop="id" label="ID" min-width="120" />
      <el-table-column prop="name" label="货物名称" min-width="120" />
      <el-table-column prop="price" label="货物价格" min-width="120" />
      <el-table-column prop="quantity" label="货物数量" min-width="120" />
      <el-table-column prop="createTime" label="创建时间" min-width="220" >
        <template #default="scope">
          <span>{{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="edit({
                name:scope.row.name,
                price:scope.row.price,
                quantity:scope.row.quantity
              })"
              
            >编辑</el-button
          >
            <div v-show="openChange" class="modal">
              <div class="change">
                <span>名称</span><el-input class="input" v-model="goodsInfo.name" disabled />
                <span>价钱</span><el-input class="input" v-model="goodsInfo.price"  />
                <span>数量</span><el-input class="input" v-model="goodsInfo.quantity" />
                <el-button style="width: 360px;height: 50px;margin-top: 30px;" @click="submit()">提交修改</el-button>
                <el-button style="width: 360px;height: 50px;margin-top: 30px; margin-left: 0;" @click="openChange = false">关闭</el-button>

              </div>
            </div>
          <el-button link type="primary" size="small" @click="delGoods(scope.row.name)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { DelGoods, GetGoods, SetGoods } from '@/apis/goodsApis'
import dayjs from 'dayjs';
import { ref, onMounted, reactive } from 'vue'
let openChange = ref<boolean>(false)
let openDelete = ref<boolean>(false)
let searchName = ref<string>('')
const goodsAbout = reactive({
  tableData: [],
  totalCount: 0
})
const goodsInfo = reactive({
    name:'',
    price:'',
    quantity:''
})
interface Data {
    name:string,
    price:string,
    quantity:string
}
const edit = (data : Data)=>{
  openChange.value = true
  const {name,price,quantity} = data
  goodsInfo.name =name
  goodsInfo.price = price
  goodsInfo.quantity  = quantity
}
const submit = async()=>{
    const res = await SetGoods(goodsInfo)
    if(res){
      getGoods()
    }
    goodsInfo.name = '',
      goodsInfo.price = '',
      goodsInfo.quantity = ''
  }
const delGoods = async(val:string)=>{
    const res = await DelGoods(val)
    if(res){
      getGoods()
      openDelete.value = false
    }
}

const getGoods = async () => {
  const { data, totalCount } = await GetGoods(searchName.value)
  goodsAbout.tableData = data
  goodsAbout.totalCount = totalCount
}

onMounted(() => {
  getGoods()
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
.modal::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(1px);
    z-index: 1; /* 确保伪元素在内容下面 */
}
.modal {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .change{
  z-index: 12;
    width: 400px;
    height: 500px;
    padding: 20px;
    margin: 30px 0;
    color: var(--color-text-primary);
    background-color: #ededee;
    .input{
        height: 50px;
        margin: 10px 0;
    }
  }
}
</style>
