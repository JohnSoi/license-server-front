<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'BasicLayout',
        props: ['addButtonConfig', 'searchConfig', 'filterConfig'],
        data() {
            return {

            }
        },
        methods: {

        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>