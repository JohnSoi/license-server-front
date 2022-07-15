<template>
  <div class="View-Login__wrapper full-size flex flex-align-center flex-justify-center">
        <LoginForm/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LoginForm from "@/components/widget/LoginForm/LoginForm.vue";

@Options({
  components: {
      LoginForm
  }
})

export default class HomeView extends Vue {}
</script>

<style scoped lang="less">
    .View-Login__wrapper {
        background: aliceblue;
    }
</style>
