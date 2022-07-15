<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { shallowRef } from 'vue'
    import { Search, Plus } from '@element-plus/icons-vue'
    import {Emmiter} from "@/helpers/BusEvents";
    import {debounceCall, throttleCall} from "@/helpers/Core";
    import Filter from "@/components/basic/Filter/Filter.vue";

    const plus = shallowRef(Plus);

    export default defineComponent({
        name: 'BasicLayout',
        props: {
            showAddButton: {
                default: false
            },
            showSearch: {
                default: false
            },
            filterConfig: {
                default: []
            },
            addButtonTooltip: {
                default: 'Добавить'
            },
            searchTooltip: {
                default: 'Начните вводить строку для поиска'
            },
            searchDelay: {
                default: 300,
                type: Number
            }
        },
        components: {Filter},
        data(): {[key: string]: any} {
            return {
                searchStr: '',
                plus,
                eventEmitThrottle: debounceCall(this.eventEmit, this.searchDelay)
            }
        },
        methods: {
            onAddButtonClick(): void {
                Emmiter.emit('addButtonClick');
            },
            eventEmit(): void {
                Emmiter.emit('changeSearchString', this.searchStr)
            },
            changeSearchString(): void {
                this.eventEmitThrottle();
            }
        },
    });
</script>

<style lang="less" scoped src="./style.less"></style>
<style lang="less">
    .Layout-BasicLayout__wrapper .el-input__inner {
        text-overflow: ellipsis;
    }
</style>