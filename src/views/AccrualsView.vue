<template>
  <div class="View-Accruals__wrapper">
    <BasicLayout :showAddButton="false" :showSearch="true">
      <template v-slot:content>
        <Accruals/>
      </template>
    </BasicLayout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BasicLayout from "../components/layout/BasicLayout/BasicLayout.vue";
import Accruals from "../components/page/Accruals/Accruals.vue";

@Options({
  components: {
    BasicLayout, Accruals
  },
})

export default class HomeView extends Vue {}
</script>
