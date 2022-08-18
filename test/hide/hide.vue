<template>
  <!-- 默认可复制 -->
  <div v-hide class="hide-test">
    夜，结束了一天的喧嚣后安静下来，伴随着远处路灯那微弱的光。风，毫无预兆地席卷整片旷野，撩动人的思绪万千。星，遥遥地挂在天空之中，闪烁着它那微微星光，不如阳光般灿烂却如花儿般如痴如醉。——丛林之狐
  </div>
  <!-- 不可复制 -->
  <div v-hide="false" class="hide-test">
    夜，结束了一天的喧嚣后安静下来，伴随着远处路灯那微弱的光。风，毫无预兆地席卷整片旷野，撩动人的思绪万千。星，遥遥地挂在天空之中，闪烁着它那微微星光，不如阳光般灿烂却如花儿般如痴如醉。——丛林之狐
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.hide-test {
  width: 100px;
}
</style>
