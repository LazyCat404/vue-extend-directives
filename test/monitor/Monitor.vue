<template>
    <div v-monitor="acceptMonitorInfor">
        <button @click="state.isPage=false">隐藏</button>
        <button v-oper  @click="state.isPage=true">显示</button>
        <div v-page v-if="state.isPage" class="monitor-page"></div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
    isPage: true
})

function acceptMonitorInfor(par:unknown){
    console.log('接收到监控信息：',par)
}
</script>
<style scoped>
.monitor-page{
    width: 200px;
    height: 100px;
    background: #ddd;
}
</style>