<template src="./template.html"/>

<script lang="ts">
    import { defineComponent } from 'vue';
    import {MenuItems} from "../../../constants/MenuItems";
    import Url from "../../../utils/Url";
    import AuthHelpers from "../../../helpers/AuthHelpers";
    import {Emmiter} from '../../../helpers/BusEvents';


    export default defineComponent({
        name: 'MainMenu',
        beforeMount(): void {
            this.path = new Url().getClearPath(false);
            this.items.forEach((item) => {
                if (item.path === this.path) {
                    this.activeMenuItem = item.id;
                }
            });
        },
        data() {
            return {
                activeMenuItem: '1',
                items: MenuItems,
                path: ''
            }
        },
        methods: {
            logout() {
                AuthHelpers.logout();
                Emmiter.emit('authChange', false);
                this.$emit('authChange', true);
            }
        }
    });
</script>

<style scoped lang="less" src="./style.less"></style>