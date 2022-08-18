<template>
  <div v-contextmenu="list">contextmenu 数组渲染菜单</div>
  <div v-contextmenu="SfcMenu">contextmenu 单文件组件渲染菜单</div>
  <div v-contextmenu="{
    sfc:SfcMenu,
    props:{list,clickFun},
  }">contextmenu 单文件组件渲染传参菜单</div>
</template>
<script lang="ts" setup>
import SfcMenu from './SfcMenu.vue';
 
function clickFun(a:unknown) {
  console.log('点击了菜单',a);
}

let list = [
  {
    label: '查看',
    click: clickFun
  },
  {
    label: '排序方式',
    divid: true,
    children: [
      {
        label: '名称',
        click: clickFun
      },
      {
        label: '大小',
        disable: true,
        click: clickFun
      },
      {
        label: '创建时间',
        click: clickFun
      }
    ]
  },
  {
    label: '复制',
    click: clickFun,
    ico: '../images/copy.png',
    sub: 'Ctrl + V'
  }
];
</script>

<style></style>