<template>
  <div class="App__wrapper full-screen hidden-overflow flex">
    <MainMenu v-if="userAuth" :isCollapseMenu="isCollapseMenu" @menuCollapseChange="menuCollapseChange"/>
    <router-view class="App-View"/>
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
  .App-View {
    height: 100%;
    width: calc(100% - 300px);
  }
</style>
