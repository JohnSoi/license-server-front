<template>
  <div class="View-License__wrapper">
    <BasicLayout :showAddButton="true" :showSearch="true" :filterConfig="filterConfig">
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
  data() {
    return {
      filterConfig: [
        {
          title: 'Дата создания от',
          type: 'date',
          viewMode: 'basic',
          field: 'dateStart',
          value: null,
          resetValue: null
        },
        {
          title: 'Дата создания до',
          type: 'date',
          viewMode: 'basic',
          field: 'dateEnd',
          value: null,
          resetValue: null
        }
      ]
    }
  }
})

export default class HomeView extends Vue {}
</script>
