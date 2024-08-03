<template>
  <div class="box color flex">
    <div class="title">新增货物</div>
    <el-input
      v-model="goods.name"
      class="input"
      placeholder="货品名称"
      clearable
    />
    <el-input
      v-model="goods.price"
      class="input"
      placeholder="货品价格"
      clearable
    />
    <el-input
      v-model="goods.quantity"
      class="input"
      placeholder="货品数量"
      clearable
    />
    <el-button class="submit" @click="submit"> 提交 </el-button>
  </div>
</template>

<script lang="ts" setup>
import { SetGoods } from '@/apis/goodsApis'
import { reactive, ref } from 'vue'
const goods = reactive({
  name: '',
  price: '',
  quantity: ''
})
const submit = async () => {
  await SetGoods(goods)
}
</script>

<style lang="scss" scoped>
.box {
  flex-direction: column;
  padding: 15px 6%;
  .title {
    padding: 20px 30px;
  }
  .input {
    margin: 20px;
    height: 50px;
    width: 400px;
  }
  .submit {
    width: 400px;
    margin: 20px;
    height: 50px;
  }
}
</style>
