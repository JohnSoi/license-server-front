<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { shallowRef } from 'vue'
    import { Search, Plus } from '@element-plus/icons-vue'
    import {Emmiter} from "../../../helpers/BusEvents";
    import {debounceCall} from "../../../helpers/Core";

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
        beforeMount(): void {
            this.filterConfig.forEach((item: any) => {
                if (item.viewMode === 'basic') {
                    this.filterSource.main.push(item);
                } else if (item.viewMode === 'additional') {
                    this.filterSource.additional.push(item);
                }
            });
        },
        data(): {[key: string]: any, filterSource: {[key: string]: any}} {
            return {
                searchStr: '',
                filterVisibility: false,
                plus,
                filterSource: {
                    main: [],
                    additional: []
                }
            }
        },
        methods: {
            onAddButtonClick(): void {
                Emmiter.emit('addButtonClick');
            },
            changeSearchString(): void {
                debounceCall(Emmiter.emit('changeSearchString', this.searchStr), this.searchDelay);
            },
            changeVisibilityFilter(): void {
                this.filterVisibility = !this.filterVisibility;
            },
            applyFilter(): void {
                const filters = [
                    ...this.filterSource.main,
                    ...this.filterSource.additional,
                ];

                const filter: {[key: string]: any} = {};

                filters.forEach((item) => {
                    if (item.value !== item.resetValue) {
                        filter[item.field] = item.value;
                    }
                });

                Emmiter.emit('changeFilter', filter);
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