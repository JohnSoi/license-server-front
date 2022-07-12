<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Card from "../../basic/Card/Card.vue";

    export default defineComponent({
        name: 'LicenseCard',
        components: {Card},
        props: {
            visible: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {

            }
        },
        methods: {
            cardVisibleChange(value: boolean) {
                this.cardVisible = value;
            }
        },
        computed: {
            computedTitle(): string {
                return 'Карточка лицензии'
            },
            cardVisible: {
                get(): boolean {
                    return this.visible
                },
                set(value: boolean) {
                    this.$emit('licenseCardVisibleChange', value);
                }
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>