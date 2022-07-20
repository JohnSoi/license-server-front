<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Bar from '@/components/basic/charts/Bar/Bar.vue';
    import SourceService from "@/services/SourceService";

    export default defineComponent({
        name: 'HomeStatistic',
        components: {Bar},
        data() {
            return {
                clientSource: new SourceService({
                    endpoint: 'Client',
                    binding: {
                        ChartData: 'ChartData'
                    }
                })
            }
        },
        methods: {

        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>