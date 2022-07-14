<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Card from "../../basic/Card/Card.vue";
    import {ObjectUtils} from "@/src/utils/Object";

    export default defineComponent({
        name: 'UserCard',
        components: {Card},
        props: {
            visible: {
                default: false,
                type: Boolean
            },
            data: {
                required: true,
                default: null
            }
        },
        beforeMount(): void {
            this.localData = this.data;
        },
        data() {
            return {
                rules: {
                    name: [
                        { required: true, message: 'Введите имя пользователя', trigger: 'blur' },
                        { min: 5, max: 20, message: 'Длинна должна быть от 5 до 20 символов', trigger: 'blur' },
                    ],
                    surname: [
                        { required: true, message: 'Введите фамилию пользователя', trigger: 'blur' },
                        { min: 5, max: 40, message: 'Длинна должна быть от 5 до 40 символов', trigger: 'blur' },
                    ],
                    second_name: [
                        { message: 'Введите отчество пользователя', trigger: 'blur' },
                        { min: 5, max: 40, message: 'Длинна должна быть от 5 до 40 символов', trigger: 'blur' },
                    ],
                    login: [
                        { required: true, message: 'Введите логин', trigger: 'blur' },
                        { min: 5, max: 40, message: 'Длинна должна быть от 4 до 20 символов', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: 'Введите пароль', trigger: 'blur' },
                        { min: 5, max: 40, message: 'Длинна должна быть от 8 до 20 символов', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: 'Введите пароль', trigger: 'blur' },
                        {}
                    ],
                },
                localData: null
            }
        },
        methods: {
            cardVisibleChange(value: boolean) {
                this.cardVisible = value;
            },
            cardSave() {
                this.$emit('cardSave', this.localData);
            }
        },
        computed: {
            computedTitle(): string {
                return 'Карточка пользователя'
            },
            cardVisible: {
                get(): boolean {
                    return this.visible
                },
                set(value: boolean) {
                    this.$emit('userCardVisibleChange', value);
                }
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>