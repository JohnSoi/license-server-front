<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import BasicList from "@/components/basic/BasicList/BasicList.vue";

    export default defineComponent({
        name: 'ListView',
        mixins: [BasicList],
        props: {
            keyProperty: {
                type: String,
                default: 'id'
            },
            displayProperty: {
                type: String,
                default: 'name'
            }
        },
        methods: {
            itemClick(item: any): void {
                this.$emit('itemClick', item);
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>