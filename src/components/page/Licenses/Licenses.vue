<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import TreeList from "@/components/basic/TreeList/TreeList.vue";
    import SourceService from "@/services/SourceService";
    import LicenseCard from "@/components/card/LicenseCard/LicenseCard.vue";
    import {Emmiter} from "@/helpers/BusEvents";

    export default defineComponent({
        name: 'LicensesPage',
        components: {TreeList, LicenseCard},
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
                    endpoint: 'License',
                    keyProperty: 'id'
                }),
                visible: false,
                data: null
            }
        },
        methods: {
            cardVisibleChange(value: boolean) {
                this.visible = value;
            },
            cardSave(data: any) {
                this.source.update(data).then((result: any) => {
                  if (result.success) {
                    this.data = result.data;
                  }
                });
            },
            nodeClick(data: any) {
                this.data = data.item;
                this.visible = true;
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>