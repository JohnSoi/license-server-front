<template>
  <div class="View-Accruals__wrapper">
    <BasicLayout :showAddButton="false" :showSearch="true" :filterConfig="filterConfig">
      <template v-slot:content>
        <Accruals/>
      </template>
    </BasicLayout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BasicLayout from "@/components/layout/BasicLayout/BasicLayout.vue";
import Accruals from "@/components/page/Accruals/Accruals.vue";
import {FILTER_TYPE, FILTER_VIEW_MODE, IFilterItem} from "@/interfaces/FilterItem";

@Options({
  components: {
    BasicLayout, Accruals
  },
  data(): {filterConfig: IFilterItem[]} {
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
          title: 'Сумма от',
          type: FILTER_TYPE.INPUT,
          viewMode: FILTER_VIEW_MODE.ADDITIONAL,
          field: 'sumFrom',
          value: null,
          resetValue: false
        },
        {
          title: 'Сумма до',
          type: FILTER_TYPE.INPUT,
          viewMode: FILTER_VIEW_MODE.ADDITIONAL,
          field: 'sumTo',
          value: null,
          resetValue: false
        }
      ]
    }
  }

})

export default class HomeView extends Vue {}
</script>
