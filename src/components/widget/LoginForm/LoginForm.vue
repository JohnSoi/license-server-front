<template src="./template.html"/>

<script lang="ts">
    import {defineComponent} from 'vue';
    import {Lock} from '@element-plus/icons-vue'
    import SourceService from "../../../services/SourceService";
    import {IResponse} from "../../../interfaces/SourceServiceInterfaces";

    export default defineComponent({
        name: "LoginForm",
        data() {
            return {
                form: {
                    login: '',
                    password: '',
                    rememberMe: false,
                },
                rules: {
                    login: [
                        {required: true, message: 'Поле обязательно для заполнения', trigger: 'blur'},
                        {min: 4, max: 20, message: 'Логин должен быть от 4 до 20 символов', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: 'Поле обязательно для заполнения', trigger: 'blur'},
                        {min: 4, max: 20, message: 'Пароль должен быть от 4 до 20 символов', trigger: 'blur'},
                    ]
                },
                sourceService: new SourceService({
                    endpoint: 'User',
                    binding: {login: 'Login', loginCheck: 'LoginCheck'}
                })
            }
        },
        methods: {
            async onSubmit() {
                const formEl: any = this.$refs.authForm;
                if (!formEl) return
                await formEl.validate((fields: any, valid: boolean) => {
                    if (valid) {
                        this.sourceService.customQuery('login', {login: this.form.login}).then((result: IResponse) => {
                            if (result.success) {
                                console.log('1');
                            }
                        });
                    }
                })
            },
            async checkLogin() {
                const formEl: any = this.$refs.authForm;
                if (!formEl) return
                await formEl.validate((fields: any, valid: boolean) => {
                    if (this.form.login && valid) {
                        this.sourceService.customQuery('loginCheck', {login: this.form.login})
                            .then((result: IResponse) => {
                            if (result.success) {
                                console.log('1');
                            }
                        });
                    }
                });
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>