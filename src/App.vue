<template>
  <div class="App__wrapper full-screen hidden-overflow">
    <MainMenu v-if="userAuth" :isCollapseMenu="isCollapseMenu" @menuCollapseChange="menuCollapseChange"/>
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import MainMenu from '@/components/widget/MainMenu/MainMenu.vue';
  import AuthHelper from "./helpers/AuthHelpers";
  import {Emmiter} from './helpers/BusEvents';

  export default defineComponent({
    name: 'App',
    components: {
      MainMenu
    },
    beforeMount(): void {
        Emmiter.on('authChange', (authUser: boolean) => {
          this.userAuth = authUser;
        });
    },
    data() {
      return {
        isCollapseMenu: false,
        userAuth: AuthHelper.userIsAuth()
      }
    },
    methods: {
      menuCollapseChange(value: boolean) {
          this.isCollapseMenu = value;
      }
    }
  });
</script>

<style lang="less">

</style>
