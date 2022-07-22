<template src="./template.html"/>

<script lang="ts">
    import {defineComponent} from 'vue';

    export default defineComponent({
        name: 'KPPView',
        props: ['value'],
        beforeMount(): void {
            this.kppLocal = this.value;
        },
        data() {
            return {
                kppLocal: '',
            }
        },
        methods: {
            kppChange() {
                this.kppLocal = this.kppLocal.replace(/[^0-9]/g, '')
                    .replace(/^(\d{2})?(\d{2})?(\d{2})?(\d{3})?/g, '$1 $2 $3 $4')
                this.$emit('kppChange', this.kppLocal);
            },
        }
    });
</script>