<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Card from "@/components/basic/Card/Card.vue";
    import PhoneNumber from "@/components/PhoneNumber/PhoneNumber.vue";
    import {ObjectUtils} from "@/src/utils/Object";

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
                        // { required: true, validator: validatePass, message: 'Введите пароль', trigger: 'blur' },
                        { min: 5, max: 40, message: 'Длинна должна быть от 8 до 20 символов', trigger: 'blur' },
                    ],
                    checkPass: [
                        // {required: true, validator: validatePass2, message: 'Подтвердите пароль', trigger: 'blur'},
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

    import { ref } from 'vue'
    import { ElMessage } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'

    import type { UploadProps } from 'element-plus'

    const imageUrl = ref('')

    const handleAvatarSuccess: UploadProps['onSuccess'] = (
        response,
        uploadFile
    ) => {
        imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    }

    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
        if (rawFile.type !== 'image/jpeg') {
            ElMessage.error('Аватар должен быть JPG формата!')
            return false
        } else if (rawFile.size / 1024 / 1024 > 2) {
            ElMessage.error('Аватар должен весить 2MB!')
            return false
        }
        return true
    }

    // const validatePass = (rule: any, value: any, callback: any) => {
    //     if (value === '') {
    //         callback(new Error('Пожалуйста введите пароль'))
    //     } else {
    //         if (ruleForm.checkPass !== '') {
    //             // eslint-disable-next-line no-undef
    //             if (!ruleFormRef.value) return
    //             // eslint-disable-next-line no-undef
    //             ruleFormRef.value.validateField('checkPass', () => null)
    //         }
    //         callback()
    //     }
    // }
    // const validatePass2 = (rule: any, value: any, callback: any) => {
    //     if (value === '') {
    //         callback(new Error('Пожалуйста введите пароль снова'))
    //     } else if (value !== ruleForm.pass) {
    //         callback(new Error("Пароли различаются"))
    //     } else {
    //         callback()
    //     }
    // }

    // eslint-disable-next-line no-undef
    // const ruleForm = reactive({
    //     pass: '',
    //     checkPass: '',
    // })

</script>


<style scoped lang="less" src="./style.less">
    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }

</style>