<template>
    <div class="View-User__wrapper">
        <BasicLayout :showAddButton="true" :showSearch="true">
            <template v-slot:content>
                <Users/>
            </template>
        </BasicLayout>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import BasicLayout from "../components/layout/BasicLayout/BasicLayout.vue";
    import Users from "../components/page/Users/Users.vue";

    @Options({
        components: {
            BasicLayout, Users
        },
    })

    export default class HomeView extends Vue {}
</script>
