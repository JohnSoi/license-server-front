<template>
  <div class="View-License__wrapper">
    <BasicLayout :showAddButton="true" :showSearch="true">
      <template v-slot:content>
        <Licenses/>
      </template>
    </BasicLayout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BasicLayout from "../components/layout/BasicLayout/BasicLayout.vue";
import Licenses from "../components/page/Licenses/Licenses.vue";

@Options({
  components: {
    BasicLayout, Licenses
  },
})

export default class HomeView extends Vue {}
</script>
