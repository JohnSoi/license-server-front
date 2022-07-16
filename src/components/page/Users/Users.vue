<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import GridView from "@/components/basic/GridView/GridView.vue";
    import SourceService from "@/services/SourceService";
    import UserCard from "@/components/card/UserCard/UserCard.vue";
    import {Emmiter} from "@/helpers/BusEvents";

    export default defineComponent({
        name: 'UsersPage',
        components: {GridView, UserCard},
        beforeMount(): void {
            Emmiter.on('addButtonClick', async () => {
                this.visible = true;
                await this.source.create().then((result) => {
                    if (result.success) {
                        this.data = result.data;
                    }
                });
            });
        },
        data() {
            return {
                source: new SourceService({
                    endpoint: 'User',
                    keyProperty: 'id'
                }),
                visible: false,
                data: null,
                treeSettings: {
                    children: 'group_uuid',
                    label: 'name',
                }
            }
        },
        methods: {
            cardVisibleChange(value: boolean) {
                this.visible = value;
            },
            cardSave(data: any) {
                this.source.update(data);
            },
            nodeClick(data: any) {
                this.data = data;
                this.visible = true;
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>