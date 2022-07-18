<template>
    <div class="View-User__wrapper">
        <BasicLayout :showAddButton="true" :showSearch="true" :filterConfig="filterConfig">
            <template v-slot:content>
                <Users/>
            </template>
        </BasicLayout>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import BasicLayout from "@/components/layout/BasicLayout/BasicLayout.vue";
    import Users from "@/components/page/Users/Users.vue";
    import {FILTER_TYPE, FILTER_VIEW_MODE, IFilterItem} from "@/interfaces/FilterItem";

    @Options({
        components: {
            BasicLayout, Users
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
                    }
                ]
            }
        }
    })

    export default class HomeView extends Vue {}
</script>
