<template src="./template.html"/>

<script lang="ts">
import {defineComponent} from 'vue';
import Card from "@/components/basic/Card/Card.vue";
import {ObjectUtils} from "@/utils/Object";

export default defineComponent({
  name: 'LicenseCard',
  components: {Card},
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    data: {
      required: true,
      default: null
    }
  },
  beforeMount(): void {
    this.localData = ObjectUtils.Clone(this.data);
  },
  data() {
    return {
      rules: {
        name: [
          {required: true, message: 'Введите название лицензии', trigger: 'blur'},
          {min: 5, max: 40, message: 'Длинна должна быть от 5 до 40 символов', trigger: 'blur'},
        ],
      },
      localData: null,
      $saveButtonDisabled: false
    }
  },
  methods: {
    cardVisibleChange(value: boolean) {
      this.cardVisible = value;
    },
    cardSave() {
      this.$emit('cardSave', this.localData);
    }
  },
  computed: {
    computedTitle(): string {
      return 'Карточка лицензии'
    },
    cardVisible: {
      get(): boolean {
        return this.visible
      },
      set(value: boolean) {
        this.$emit('licenseCardVisibleChange', value);
      }
    },
    saveButtonDisabled(): boolean {
      return ObjectUtils.Equal(this.data, this.localData);
    }
  }
});
</script>

<style scoped lang="less" src="./style.less"></style>