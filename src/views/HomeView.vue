<template>
    <div class="View-Home__wrapper">
        <BasicLayout>
            <template v-slot:content>
                <Home/>
            </template>
        </BasicLayout>
    </div>
</template>

<script lang="ts">
    import {Options, Vue} from 'vue-class-component';
    import BasicLayout from '@/components/layout/BasicLayout/BasicLayout.vue';
    import Home from '@/components/page/Home/Home.vue';

    @Options({
        components: {
            BasicLayout, Home
        },
    })

    export default class HomeView extends Vue {
    }
</script>
