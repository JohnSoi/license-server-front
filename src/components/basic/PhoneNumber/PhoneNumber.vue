<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'PhoneNumberView',
        props: ['value'],
        beforeMount(): void {
            this.number = this.value || '+7  ';
        },
        data: function () {
            return {
                number: '',
            }
        },
        methods: {
            numberChange() {
                this.number = this.number.replace(/^\+7(\d{3})?(\d{3})?(\d{4})?/g, '+7 ($1) $2-$3')
                this.$emit('numberChange', this.number);
                    // .number.replace(/[^0-9]/g, '')
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>