<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import SourceService from "@/services/SourceService";

    export default defineComponent({
        name: 'BarChart',
        props: {
            source: {
                required: true,
                type: SourceService
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