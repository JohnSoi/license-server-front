<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Card from "@/components/basic/Card/Card.vue";
    import PhoneNumber from "@/components/PhoneNumber/PhoneNumber.vue";


    export default defineComponent({
        name: 'UserCard',
        components: {Card, PhoneNumber},
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
        data(): {[key: string]: any} {
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
                    checkPass: [
                        {required: true, message: 'Введите подтверждение пароля', trigger: 'blur'},
                        {validator: this.passwordConfirmValidator, trigger: 'blur'}
                    ],
                    email: [
                        { required: true, message: 'Введите почту', trigger: 'blur' },
                        { type: 'email', message: 'Введите корректную почту', trigger: 'blur'}
                    ],
                    telephone: [
                        { message: 'Введите телефон', trigger: 'blur' },
                        { type: 'phone', message: 'Введите телефон', trigger: 'blur'},
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
            },
            passwordConfirmValidator(rule: any, value: any, callback: any) {
                if (value === '') {
                    callback(new Error('Поле подтверждения не заполнено'))
                } else if (value !== this.localData.password) {
                    callback(new Error("Пароли не совпадают"))
                } else {
                    callback()
                }
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


<style lang="less" src="./style.less"></style>
