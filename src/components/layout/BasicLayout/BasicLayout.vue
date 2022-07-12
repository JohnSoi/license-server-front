<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { shallowRef } from 'vue'
    import { Search, Plus } from '@element-plus/icons-vue'
    import {Emmiter} from "../../../helpers/BusEvents";

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
                default: {}
            },
            addButtonTooltip: {
                default: 'Добавить'
            },
            searchTooltip: {
                default: 'Начните вводить строку для поиска'
            }
        },
        data() {
            return {
                searchStr: '',
                plus
            }
        },
        methods: {
            onAddButtonClick() {
                Emmiter.emit('addButtonClick');
            }
        }
    });
</script>

<style lang="less" scoped src="./style.less"></style>
<style lang="less">
    .Layout-BasicLayout__wrapper .el-input__inner {
        text-overflow: ellipsis;
    }
</style>