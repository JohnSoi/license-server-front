<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { ElMessage } from 'element-plus';
    import {ServerConstants} from "@/constants";

    export default defineComponent({
        name: 'AvatarLoader',
        props: ['avatarPath'],
        data() {
            return {
                serverPath: ServerConstants.ServerProtocol + '://' + ServerConstants.ServerUrl,
                loadAvatarPath: ServerConstants.ServerProtocol + '://' + ServerConstants.ServerUrl + '/photo_load'
            }
        },
        methods: {
            handleAvatarSuccess(response: any, uploadFile: any) {
                this.avatarUrl = response;
            },
            beforeAvatarUpload (rawFile: any) {
                return true
            }
        },
        computed: {
            avatarUrl: {
                get(): string | null {
                    return this.avatarPath;
                },
                set(value: string): void {
                    this.$emit('setAvatar', this.serverPath + '/get_photo/' + value);
                }
            }
        }
    });
</script>

<style lang="less" src="./style.less"></style>