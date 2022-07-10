<template>
  <div class="App_wrapper full-screen hidden-overflow">
    <MainMenu v-if="userAuth"/>
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import MainMenu from '@/components/widget/MainMenu/MainMenu.vue';
  import AuthHelper from "./helpers/AuthHelpers";

  export default defineComponent({
    name: 'App',
    components: {
      MainMenu
    },
    data() {
      return {
        minimizeMenu: false,
        userAuth: AuthHelper.userIsAuth()
      }
    }
  });
</script>

<style lang="less">

</style>
