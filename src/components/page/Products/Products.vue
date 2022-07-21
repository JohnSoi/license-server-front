<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import GridView from "@/components/basic/GridView/GridView.vue";
    import SourceService from "@/services/SourceService";
    import ProductCard from "@/components/card/ProductCard/ProductCard.vue";
    import {Emmiter} from "@/helpers/BusEvents";

    export default defineComponent({
        name: 'ProductsPage',
        components: {GridView, ProductCard},
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
                    endpoint: 'Product',
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
<style lang="less" src="./style.less"></style>