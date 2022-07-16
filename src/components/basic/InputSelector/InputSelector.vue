<template src="./template.html"/>

<script lang="ts">
import {defineComponent} from 'vue';
import SourceService from "@/services/SourceService";

export default defineComponent({
  name: 'InputSelector',
  props: {
    source: {
      required: true,
      type: SourceService
    },
    keyProperty: {
      type: String,
      default: 'id'
    },
    displayProperty: {
      type: String,
      default: 'name'
    },
    placeholder: {
      type: String,
      default: 'Начните ввод для поиска'
    }
  },
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    handleSelect(item: any): any {
      return item[this.keyProperty];
    },
    querySearch(searchString: string, callback: any): void {
      let result: any[] = [];

      if (searchString) {
        this.source.search(searchString, {onlyGroups: true})
            .then((resultData: any) => {
              if (resultData.success) {
                result = resultData;
              }
            });
      }

      callback(result);

    }
  }
});
</script>

<style scoped lang="less" src="./style.less"></style>