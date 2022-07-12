<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import TreeList from "../../basic/TreeList/TreeList.vue";
    import SourceService from "../../../services/SourceService";
    import LicenseCard from "../../card/LicenseCard/LicenseCard.vue";
    import {Emmiter} from "../../../helpers/BusEvents";

    export default defineComponent({
        name: 'LicensesPage',
        components: {TreeList, LicenseCard},
        beforeMount(): void {
            Emmiter.on('addButtonClick', () => {
                this.visible = true;
                this.source.create();
            });
        },
        data() {
            return {
                source: new SourceService({
                    endpoint: 'License',
                    keyProperty: 'id'
                }),
                visible: false
            }
        },
        methods: {
            cardVisibleChange(value: boolean) {
                this.visible = value;
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>