<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import GridView from "@/components/basic/GridView/GridView.vue";
    import SourceService from "@/services/SourceService";


    export default defineComponent({
        name: 'AccrualsPage',
        components: {GridView},

        data() {
            return {
                source: new SourceService({
                    endpoint: 'Accrual',
                    keyProperty: 'id'
                }),
                visible: false,
                data: null
            }
        },
        methods: {

        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>