<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import SourceService from "../../../services/SourceService";
    import {Emmiter} from "../../../helpers/BusEvents";

    export default defineComponent({
        name: 'TreeList',
        props: {
            treeSettings: {
                default: {
                    children: 'children',
                    label: 'label',
                }
            },
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
            Emmiter.on('changeSearchString', (value: string) => {
                this.source.list({searchString: value}).then((result) => {
                    if (result.success) {
                        this.data = result.data;
                    }
                });
            });
            Emmiter.on('changeFilter', (filter: any) => {
                this.source.list(filter).then((result) => {
                    if (result.success) {
                        this.data = result.data;
                    }
                });
            });
        },
        data() {
            return {
                data: null
            }
        },
        methods: {
            handleNodeClick(nodeData: any) {
                this.$emit('nodeClick', nodeData);
            },
            load() {
                return [];
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>