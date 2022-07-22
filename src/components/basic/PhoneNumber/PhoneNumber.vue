<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'PhoneNumberView',
        props: ['value'],
        data: function () {
            return {
                phone: '',
            }
        },
        beforeMount(): void {
            this.phone = this.value;
        },
        methods: {
            numberChange() {
                let val = this.phone;
                val = this.cleanValue(val);
                this.phone = this.format(val);
                this.$emit('numberChange', this.phone);
            },
            cleanValue(value){
                value = value.replace(/[^0-9]/g, "");
                if (value.startsWith("7")) value = value.substring(1);
                return value;
            },
            format(value) {
                const match = value.matchAll(/(\d{1,3})?(\d{1,3})?(\d{1,4})?/g);
                const parts = [...match];
                const [str, p1 = "", p2 = "", p3 = ""] = parts[0];
                let res = `+7 `;
                if (p1) res += `(${p1}`;
                if (p2) res += `) ${p2}`;
                if (p3) res += ` - ${p3}`;
                return res;
                }
            }
    });
</script>