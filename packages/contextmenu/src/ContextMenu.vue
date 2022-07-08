<template>
  <ul v-show="state.isRender" class="context-menu-wrapper">
    <!-- 存在子菜单则忽略父菜单点击事件 -->
    <li
      v-for="(item, i) in (renderList as any)"
      :key="i"
      @click="clickMenu(item.disable || (item.children && item.children.length) ? null : item.click)"
      :disabled="item.disable ? '' : null"
      :divid="item.divid && i !== renderList.length - 1 ? '' : null"
    >
      <div>
        <img :src="item.ico" class="label-ico" />
        <span class="main-label">{{ item.label }}</span>
        <span class="sub-label">{{ item.sub }}</span>
        <i class="child-open" v-if="item.children && item.children.length">＞</i>
      </div>
      <ul class="sub-list" v-if="item.children && item.children.length">
        <li
          v-for="(sub, key) in item.children"
          :key="key"
          @click="clickMenu(sub.disable ? null : sub.click)"
          :disabled="sub.disable ? '' : null"
        >
          {{ sub.label }}
        </li>
      </ul>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  name: 'ContextMenu',
  props: {
    renderList: { default: [] }
  },
  setup() {
    const state = reactive({
      isRender: false
    });
    function initRender() {
      state.isRender = true;
    }
    function clickMenu(par: any) {
      if (par) {
        par();
      }
    }
    return {
      state,
      initRender,
      clickMenu
    };
  }
});
</script>
<style>
.context-menu-wrapper {
  padding: 0;
  margin: 0;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 12%);
  border-radius: 4px;
  font-size: 14px;
  padding: 7px 0;
  min-width: 200px;
}
.context-menu-wrapper li {
  padding: 0px 16px;
  line-height: 34px;
  height: 34px;
  list-style: none;
  cursor: pointer;
  position: relative;
}
.context-menu-wrapper > li > div {
  display: -webkit-flex;
  display: flex;
  align-items: center;
  height: 34px;
}
.context-menu-wrapper li[divid] {
  border-bottom: 1px solid #f0f1f3;
}
.context-menu-wrapper li i {
  font-style: normal;
}
.context-menu-wrapper li img.label-ico {
  max-width: 16px;
  display: inline-block;
}
.context-menu-wrapper li i.child-open {
  position: absolute;
  right: 12px;
}
.context-menu-wrapper .main-label,
.context-menu-wrapper .sub-label {
  position: absolute;
}
.context-menu-wrapper .main-label {
  left: 38px;
  color: #606266;
}
.context-menu-wrapper .sub-label {
  right: 38px;
  font-size: 12px;
  color: #c0c4cc;
}
.context-menu-wrapper li:hover {
  background-color: #ecf5ff;
}
.context-menu-wrapper li:hover .main-label,
.context-menu-wrapper li:hover .child-open,
.context-menu-wrapper li:hover .sub-label {
  color: #409eff;
}
/* 子菜单 */
.context-menu-wrapper .sub-list {
  position: absolute;
  padding: 0;
  margin: 0;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 12%);
  border-radius: 4px;
  font-size: 14px;
  padding: 7px 0;
  width: 150px;
  right: -145px;
  top: 0px;
  display: none;
  color: #606266;
}
.context-menu-wrapper li:hover .sub-list {
  display: block;
}
.context-menu-wrapper .sub-list > li:hover {
  color: #409eff;
}
/* 禁用的菜单 */
.context-menu-wrapper li[disabled] {
  cursor: no-drop;
}
.context-menu-wrapper li[disabled] .main-label,
.context-menu-wrapper .sub-list > li[disabled] {
  color: #9fa0a3;
}
.context-menu-wrapper li[disabled]:hover .sub-label {
  color: #c0c4cc;
}
</style>
