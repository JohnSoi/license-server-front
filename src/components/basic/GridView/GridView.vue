<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import BasicList from "../../../components/basic/BasicList/BasicList.vue";

    export default defineComponent({
        name: 'GridView',
        mixins: [BasicList],
        methods: {
            rowClick(row: any, column: any): void {
                this.$emit('rowClick', row, column);
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>