<template src="./template.html"/>

<script lang="ts">
import {defineComponent} from 'vue';
import BasicList from "../../../components/basic/BasicList/BasicList.vue";

export default defineComponent({
  name: 'TreeList',
  mixins: [BasicList],
  props: {
    treeSettings: {
      default: {
        children: 'children',
        label: 'label',
      }
    }
  },
  methods: {
    handleNodeClick(nodeData: any) {
      this.$emit('nodeClick', nodeData);
    },

  }
});
</script>

<style scoped lang="less" src="./style.less"></style>