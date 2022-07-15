<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import GridView from "../../basic/GridView/GridView.vue";
    import SourceService from "../../../services/SourceService";
    import {Emmiter} from "../../../helpers/BusEvents";

    export default defineComponent({
        name: 'AccrualsPage',
        components: {GridView},

        data() {
            return {
                source: new SourceService({
                    endpoint: 'Accruals',
                    keyProperty: 'id'
                }),
                visible: false,
                data: null,

            }
        },
        methods: {

        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>