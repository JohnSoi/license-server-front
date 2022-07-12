<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'BaseCard',
        props: {
            visible: {
                default: false,
                type: Boolean
            },
            title: {
                default: 'Карточка',
                type: String
            }
        },
        data() {
            return {

            }
        },
        methods: {
            handleClose() {
                this.cardVisible = false;
            },
            saveCard() {
                this.$emit('cardSave');
            }
        },
        computed: {
            cardVisible: {
                get(): boolean {
                    return this.visible
                },
                set(value: boolean) {
                    this.$emit('cardVisibleChange', value);
                }
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>