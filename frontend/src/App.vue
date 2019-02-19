<template>
    <v-app class="background">
        <v-content class="mx-4 mb-4">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {
                //
            };
        }
    };
</script>
