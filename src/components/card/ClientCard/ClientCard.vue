<template src="./template.html"/>

<script lang="ts">
    import {defineComponent} from 'vue';
    import Card from "@/components/basic/Card/Card.vue";
    import {ObjectUtils} from "@/utils/Object";
    import SourceService from "@/services/SourceService";
    import PhoneNumber from "@/components/basic/PhoneNumber/PhoneNumber.vue";
    import INN from "@/components/basic/INN/INN.vue";//добавила биб
    import KPP from "@/components/basic/KPP/KPP.vue";//добавила биб
    import AvatarLoader from "@/components/basic/AvatarLoader/AvatarLoader.vue";
    import {MenuItems} from "@/constants/MenuItems";

    export default defineComponent({
        name: 'ClientCard',
        components: {Card, PhoneNumber,AvatarLoader,INN,KPP,MenuItems},
        props: {
            visible: {
                default: false,
                type: Boolean
            },
            data: {
                required: true,
                default: null,
            },
        },
        beforeMount(): void {
            this.localData = ObjectUtils.Clone(this.data);
        },
        data(): {[key: string]: any} {
            return {
                rules: {
                    name: [
                        {required: true, message: 'Введите имя', trigger: 'blur'},
                        {min: 5, max: 40, message: 'Длинна должна быть от 5 до 40 символов', trigger: 'blur'},
                    ],
                    inn: [
                        {required: true, message: 'Введите ИНН', trigger: 'blur'},
                        {validator: this.isValidInn, trigger: 'blur'}
                    ],
                    kpp: [
                        {required: true, message: 'Введите КПП', trigger: 'blur'},
                        {min: 9, message: 'Длинна должна быть 9 символов', trigger: 'blur'},
                    ],
                    is_active: [
                        {type: "boolean"},
                    ],
                    email: [
                        { required: true, message: 'Введите почту', trigger: 'blur' },
                        { type: 'email', message: 'Введите корректную почту', trigger: 'blur'}
                    ],
                    phone: [
                        { message: 'Введите телефон', trigger: 'blur' },
                        { type: 'phone', message: 'Введите телефон', trigger: 'blur', maxlength:'11'},
                    ],
                },
                localData: null,
                source: new SourceService({endpoint: 'Client'})
            }
        },

        methods: {
            cardVisibleChange(value: boolean) {
                this.cardVisible = value;
            },
            cardSave() {
                this.$emit('cardSave', this.localData);
            },
            selectedChange(key: any) {
                this.localData.group_id = key;
            },
            numberChange(value: string): void {
                this.localData.phone = value;
            },
            innChange(value: string): void {
                this.localData.inn = value;
            },
            isValidInn(rule: any, value: any, callback: any) {
                if (value === '') {
                    callback(new Error('Поле подтверждения не заполнено'))
                } else {
                    callback()
                }
            },
            kppChange(value: string): void {
                this.localData.kpp = value;
            },
            setAvatar(value: string): void {
                this.localData.photo_url = value;
            },
        },
        computed: {
            computedTitle(): string {
                return 'Карточка клиентов'
            },
            cardVisible: {
                get(): boolean {
                    return this.visible
                },
                set(value: boolean) {
                    this.$emit('clientCardVisibleChange', value);
                }
            },
            saveButtonDisabled(): boolean {
                return ObjectUtils.Equal(this.data, this.localData);
            },
        },

    });
</script>

<style scoped lang="less" src="./style.less"></style>