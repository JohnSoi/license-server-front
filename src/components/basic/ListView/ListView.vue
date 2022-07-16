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
            },
            filter: {
                default: {}
            }
        },
        methods: {
            itemClick(item: any): void {
                this.$emit('itemClick', item);
            },
            getDataInSource(filter: any = {}) {
                filter.withoutHierarchy = true;
                filter = {
                    ...filter,
                    ...this.filter
                };

                this.throttleSource(filter, this);
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>