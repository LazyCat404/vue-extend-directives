<template>
    <div v-monitor="acceptMonitorInfor">
        <div v-page v-if="state.isPage"> 
            <button v-oper @click="state.isPage=false">按钮1</button>
        </div>
        <div v-page> 
            <button v-oper  @click="state.isPage=true">按钮2</button>
        </div>
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