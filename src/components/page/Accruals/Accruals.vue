<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import GridView from "@/components/basic/GridView/GridView.vue";
    import SourceService from "@/services/SourceService";
    import {Emmiter} from "@/helpers/BusEvents";
    import {ObjectUtils} from "@/utils/Object";

    export default defineComponent({
        name: 'AccrualsPage',
        components: {GridView},
        beforeMount(): void {
            this.data = ObjectUtils.Clone(this.data);
        },
        data() {
            return {
                source: new SourceService({
                    endpoint: 'Accrual',
                    keyProperty: 'id'
                }),
                visible: false,
                data: null,
                treeSettings: {
                    children: 'group_id',
                    label: 'name',
                }
            }
        },
        methods: {


            nodeClick(data: any) {
                this.data = data;
                this.visible = true;
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>