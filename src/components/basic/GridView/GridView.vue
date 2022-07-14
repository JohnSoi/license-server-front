<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import SourceService from "../../../services/SourceService";

    export default defineComponent({
        name: 'GridView',
        props: {
            source: {
                required: true,
                type: SourceService
            }
        },
        beforeMount() {
            this.source.list({}).then((result) => {
                if (result.success) {
                    this.data = result.data;
                }
            });
        },
        data() {
            return {
                data: null
            }
        },
        methods: {
            load(): Array<any> {
                return [];
            },
            rowClick(row: any, column: any): void {
                this.$emit('rowClick', row, column);
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>