<template src="./template.html"/>

<script lang="ts">
    import {defineComponent} from 'vue';
    import {Emmiter} from "@/helpers/BusEvents";
    import {FILTER_TYPE, FILTER_VIEW_MODE, IFilterData, IFilterItem} from "@/interfaces/FilterItem";

    export default defineComponent({
        name: 'FilterView',
        props: {
            filterConfig: {
                default: []
            },
        },
        beforeMount(): void {
            this.filterConfig.forEach((item: IFilterItem) => {
                if (item.viewMode === FILTER_VIEW_MODE.BASIC) {
                    this.filterSource.main.push(item);
                } else if (item.viewMode === FILTER_VIEW_MODE.ADDITIONAL) {
                    this.filterSource.additional.push(item);
                }
            });
        },
        data(): IFilterData  {
            return {
                filterSource: {
                    main: [],
                    additional: []
                },
                filterVisibility: false,
                filterType: FILTER_TYPE
            }
        },
        methods: {
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
            },
            changeVisibilityFilter(): void {
                this.filterVisibility = !this.filterVisibility;
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>