<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import SourceService from "@/services/SourceService";
    import { BarChart } from 'vue-chart-3';

    export default defineComponent({
        name: 'BarChart',
        props: {
            source: {
                required: true,
                type: SourceService
            },
            methodName: {
                type: String,
                default: 'ChartData'
            }
        },
        async beforeMount() {
            await this.source.customQuery('ChartData', this.filter)
                .then((result: any) => {
                    if (result.success) {
                        this.data = result.data;
                    }
                });
        },
        data() {
            return {
                filter: {},
                data: null
            }
        },
        methods: {

        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>