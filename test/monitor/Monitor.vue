<template>
    <div v-monitor="acceptMonitorInfor">
        <div v-oper>
            <button @click="state.isPage=false">隐藏</button>
            <button @click="state.isPage=true">显示</button>
        </div>
        <div v-page v-show="state.isPage" class="monitor-page">
            <audio v-media controls="true">
                <source src="./assets/test.mp3" type="audio/mpeg" />
            </audio>
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
<style scoped>
.monitor-page{
    width: 300px;
    height: 350px;
    margin-top: 20px;
    background: #ddd;
    display: -webkit-flex; 
    display: flex;                      
    justify-content:center;           
    align-items:center;            
}img{
    width: 400px;
    height: 400px;
}
</style>