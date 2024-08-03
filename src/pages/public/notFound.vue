<template>
     <div class="not-found color backgroundColor flex">
        <span>页面不见了 ( 404 )</span>
        <router-link :to="{ path: 'manage/' }">点击回到首页</router-link>
    </div>
   
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
      .not-found{
        justify-content: center;
        align-items: center;
        padding: 8% 0 5% 0;
        flex-direction: column;
        box-shadow: 0px 10px 10px 1px var(--color-border);

        span{
            font-size: 1.2em;
            margin-bottom: 10px;
        }
      }
</style>