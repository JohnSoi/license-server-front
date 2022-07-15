<template src="./template.html"/>

<script lang="ts">
import {defineComponent} from 'vue';
import {Emmiter} from "@/helpers/BusEvents";

export default defineComponent({
  name: 'BaseCard',
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    title: {
      default: 'Карточка',
      type: String
    },
    menuItems: {
      default: null
    },
    size: {
      type: String,
      default: '40%'
    },
    saveButtonDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeMenuItem: '1'
    }
  },
  methods: {
    handleClose() {
      this.cardVisible = false;
    },
    saveCard() {
      this.$emit('cardSave');
      Emmiter.emit('cardSave');
    }
  },
  computed: {
    cardVisible: {
      get(): boolean {
        return this.visible
      },
      set(value: boolean) {
        this.$emit('cardVisibleChange', value);
      }
    }
  }
});
</script>

<style lang="less" src="./style.less"></style>