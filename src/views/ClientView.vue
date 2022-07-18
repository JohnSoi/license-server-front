<template>
    <div class="View-Client__wrapper">
        <BasicLayout :showAddButton="true" :showSearch="true">
            <template v-slot:content>
                <Clients/>
            </template>
        </BasicLayout>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import BasicLayout from "../components/layout/BasicLayout/BasicLayout.vue";
    import Clients from "../components/page/Clients/Clients.vue";

    @Options({
        components: {
            BasicLayout, Clients
        },
    })

    export default class HomeView extends Vue {}
</script>
