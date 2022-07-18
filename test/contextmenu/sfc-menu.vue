<template>
  <div>
    <ul>
      <li>
        <span>刷新</span>
      </li>
      <li>
        <span>新建</span>
      </li>
      <li class="division-line">
        <span @click="childSFC">删除</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    list:Array,
    clickFun:Function
})
function childSFC(){
  console.log('接到参数：',props);
  (props.clickFun as Function)();

}
</script>

<style  scoped>
ul {
  padding: 0;
  margin: 0;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 12%);
  border-radius: 4px;
  font-size: 14px;
  padding: 7px 0;
  min-width: 150px;

}
li {
padding: 0px 16px 0 36px;
line-height: 34px;
height: 34px;
list-style: none;
cursor: pointer;
position: relative;

}
li:hover {
background-color: #ecf5ff;
color: #409eff;
}
li.division-line {
border-top: 1px solid #f0f1f3;
}
</style>
