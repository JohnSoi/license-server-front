<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import {MenuItems} from "@/constants/MenuItems";
    import Url from "@/utils/Url";
    import AuthHelpers from "@/helpers/AuthHelpers";
    import {Emmiter} from '@/helpers/BusEvents';
    import {DEFAULT_URL_PHOTO} from "@/constants";


    export default defineComponent({
        name: 'MainMenu',
        props: ['isCollapseMenu'],
        beforeMount(): void {
            this.path = new Url().getClearPath(false);
            this.items.forEach((item) => {
                if (item.path === this.path) {
                    this.activeMenuItem = item.id;
                }
            });
            this.userInfo = AuthHelpers.getUserInfo();
        },
        data() {
            return {
                activeMenuItem: '1',
                items: MenuItems,
                path: '',
                userInfo: {},
                defaultAvatar: DEFAULT_URL_PHOTO
            }
        },
        methods: {
            logout() {
                AuthHelpers.logout();
                Emmiter.emit('authChange', false);
            }
        },
        computed: {
            isCollapse: {
                get(): boolean {
                    return this.isCollapse;
                },
                set(value: boolean) {
                    this.$emit('menuCollapseChange', value);
                }
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>