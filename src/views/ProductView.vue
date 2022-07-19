<template>
  <div class="View-Product__wrapper">
    <BasicLayout :showAddButton="true" :showSearch="true" :filterConfig="filterConfig">
      <template v-slot:content>
        <Products/>
      </template>
    </BasicLayout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BasicLayout from "@/components/layout/BasicLayout/BasicLayout.vue";
import Products from "@/components/page/Products/Products.vue";
import {FILTER_TYPE, FILTER_VIEW_MODE, IFilterItem} from "@/interfaces/FilterItem";

@Options({
  components: {
    BasicLayout, Products
  },
  data() {
    return {
      filterConfig: [
        {
          title: 'Дата создания от',
          type: FILTER_TYPE.DATE,
          viewMode: FILTER_VIEW_MODE.BASIC,
          field: 'dateStart',
          value: null,
          resetValue: null
        },
        {
          title: 'Дата создания до',
          type: FILTER_TYPE.DATE,
          viewMode: FILTER_VIEW_MODE.BASIC,
          field: 'dateEnd',
          value: null,
          resetValue: null
        },
        {
          title: 'Только группы',
          type: FILTER_TYPE.SWITCH,
          viewMode: FILTER_VIEW_MODE.ADDITIONAL,
          field: 'onlyGroups',
          value: null,
          resetValue: false
        }
      ]
    }
  }
})

export default class HomeView extends Vue {}
</script>
