<template src="./template.html"/>

<script lang="ts">
    import {defineComponent} from 'vue';

    export default defineComponent({
        name: 'INNView',//задаем имя
        props: ['value'],//передаем входные переменные
        beforeMount(): void {//вызываем функцию Вызывается непосредственно перед началом монтирования
            this.inn = this.value;//// `this` указывает на экземпляр
        },
        data() {
            return {
                inn: '',
            }
        },
        methods: {
            innChange() {
                this.inn = this.inn.replace(/[^0-9]/g, '')
                    .replace(/^(\d{2})?(\d{5})?(\d{4})?(\d{2})?/g, '$1 $2 $3 $4')
                if (this.isValidInn()) {
                    this.$emit('innChange', this.inn);
                } else {
                    this.$emit('innNotCorrect')
                }
            },
            isValidInn() {
                if (this.inn.match(/\D/)) return false;

                const number: any = this.inn.match(/(\d)/g);

                if (number.length == 10) {
                    return number[9] == String(((
                        2 * number[0] + 4 * number[1] + 10 * number[2] +
                        3 * number[3] + 5 * number[4] + 9 * number[5] +
                        4 * number[6] + 6 * number[7] + 8 * number[8]
                    ) % 11) % 10)
                } else if (number.length == 12) {
                    return number[10] == String(((
                        7 * number[0] + 2 * number[1] + 4 * number[2] +
                        10 * number[3] + 3 * number[4] + 5 * number[5] +
                        9 * number[6] + 4 * number[7] + 6 * number[8] +
                        8 * number[9]
                    ) % 11) % 10) && number[11] == String(((
                        3 * number[0] + 7 * number[1] + 2 * number[2] +
                        4 * number[3] + 10 * number[4] + 3 * number[5] +
                        5 * number[6] + 9 * number[7] + 4 * number[8] +
                        6 * number[9] + 8 * number[10]
                    ) % 11) % 10);
                }
                return false;
            }
        }
    });
</script>