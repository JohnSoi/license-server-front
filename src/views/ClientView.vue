<template>
    <div class="View-Client__wrapper">
        <BasicLayout :showAddButton="true" :showSearch="true" :filterConfig="filterConfig">
            <template v-slot:content>
                <Clients/>
            </template>
        </BasicLayout>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import BasicLayout from "@/components/layout/BasicLayout/BasicLayout.vue";
    import Clients from "@/components/page/Clients/Clients.vue";
    import {FILTER_TYPE, FILTER_VIEW_MODE, IFilterItem} from "@/interfaces/FilterItem";

    @Options({
        components: {
            BasicLayout, Clients
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
                        title: 'Активность',
                        type: FILTER_TYPE.SWITCH,
                        viewMode: FILTER_VIEW_MODE.ADDITIONAL,
                        field: 'isActive',
                        value: null,
                        resetValue: null
                    },

                    {
                        title: 'Наличие платных лицензий',
                        type: FILTER_TYPE.SWITCH,
                        viewMode: FILTER_VIEW_MODE.ADDITIONAL,
                        field: 'isPaid',
                        value: null,
                        resetValue: false
                    }
                ]
            }
        }
    })

    export default class HomeView extends Vue {}
</script>
