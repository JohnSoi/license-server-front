<template src="./template.html"/>

<script lang="ts">
    import {defineComponent} from 'vue';
    import SourceService from "@/services/SourceService";
    import ListView from "@/components/basic/ListView/ListView.vue";

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
            },
            selectorConfig: {
                default: {title: 'Выбор из справочника'}
            },
            value: {
                default: null
            }
        },
        components: {ListView},
        async beforeMount(): Promise<void> {
            if (this.value) {
                const item = await this.getDataInSource(this.value);
                this.inputValue = String(item[this.displayProperty]);
                this.oldValue = this.value;
            }
        },
        async beforeUpdate(): Promise<void> {
            if (this.value && this.oldValue !== this.value) {
                const item = await this.getDataInSource(this.value);
                this.inputValue = item[this.displayProperty];
                this.oldValue = this.value;
            }
        },
        data() {
            return {
                inputValue: '',
                oldValue: null,
                selectorVisible: false
            }
        },
        methods: {
            handleSelect(item: any): any {
                this.$emit('selectedChange', item[this.keyProperty]);
            },
            itemClick(item: any) {
                this.selectorVisible = false;
                this.$emit('selectedChange', item[this.keyProperty]);
            },
            async getDataInSource(key: number): Promise<{[key: string]: string}> {
                return await this.source.query(key).then((result: any) => {
                    if (result.success) {
                        return result.data;
                    }
                });
            },
            async querySearch(searchString: string, callback: any): Promise<void> {
                let result: any[] = [];

                if (searchString) {
                    await this.source.search(searchString, {onlyGroups: true})
                        .then((resultData: any) => {
                            if (resultData.success) {
                                result = resultData.data;
                            }
                        });
                }

                callback(result);
            },
            openSelector(): void {
                this.selectorVisible = true;
            }
        }
    });
</script>

<style lang="less" src="./style.less"></style>