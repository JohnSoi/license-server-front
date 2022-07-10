<template>
  <div class="App_wrapper full-screen hidden-overflow">
    <MainMenu/>
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import MainMenu from '@/components/widget/MainMenu/MainMenu.vue';

  export default defineComponent({
    name: 'App',
    components: {
      MainMenu
    },
    data() {
      return {
        minimizeMenu: false
      }
    }
  });
</script>

<style lang="less">

</style>
