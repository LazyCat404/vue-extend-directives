<template>
  <div v-contextmenu="list">contextmenu 数组渲染菜单</div>
</template>

<script lang="ts" setup>
function clickFun() {
  console.log('点击了菜单');
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
