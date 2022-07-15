<template src="./template.html"/>

<script lang="ts">
    import {defineComponent} from 'vue';
    import {Lock} from '@element-plus/icons-vue'
    import SourceService from "@/services/SourceService";
    import {IResponse} from "@/interfaces/SourceServiceInterfaces";
    import AuthHelpers from "@/helpers/AuthHelpers";
    import router from "@/router";
    import {Emmiter} from '@/helpers/BusEvents';
    import {DEFAULT_URL_PHOTO} from "@/constants";

    export default defineComponent({
        name: "LoginForm",
        data() {
            return {
                submitDisabled: false,
                form: {
                    login: '',
                    password: '',
                    rememberMe: false
                },
                avatarUrl: DEFAULT_URL_PHOTO,
                defaultAvatar: DEFAULT_URL_PHOTO,
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
                errors: {
                    login: '',
                    password: ''
                },
                sourceService: new SourceService({
                    endpoint: 'User',
                    binding: {login: 'Login', loginCheck: 'LoginCheck'}
                })
            }
        },
        methods: {
            async onSubmit() {
                this.submitDisabled = true;
                const formEl: any = this.$refs.authForm;
                if (!formEl) return
                await formEl.validate((valid: boolean) => {
                    if (valid) {
                        this.sourceService.customQuery('login', {login: this.form.login, password: this.form.password})
                            .then((result: IResponse) => {
                                if (result.success) {
                                    AuthHelpers.login(this.form.rememberMe, result.data.uuid, result.data);
                                    Emmiter.emit('authChange', true);
                                    router.push('/');
                                } else {
                                    this.errors[result.field_error === 'login' ? 'login' : 'password'] = result.error;
                                }
                            });
                    }
                    this.submitDisabled = false;
                }).catch(() => {
                    this.submitDisabled = false
                });
            },
            async checkLogin() {
                this.avatarUrl = this.defaultAvatar;
                this.submitDisabled = true;
                const formEl: any = this.$refs.authForm;
                if (!formEl) return
                await formEl.validate((valid: boolean, fields: any) => {
                    if (this.form.login && Object.keys(fields).indexOf('login') === -1) {
                        this.sourceService.customQuery('loginCheck', {login: this.form.login})
                            .then((result: IResponse) => {
                                if (result.success) {
                                    this.avatarUrl = result.data.photo_url ?
                                        String(result.data.photo_url) : this.defaultAvatar;
                                    this.submitDisabled = false;
                                    this.errors.login = '';
                                } else {
                                    this.errors.login = result.error;
                                    this.submitDisabled = true;
                                }
                            });
                    }
                });
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>