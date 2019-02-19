<template>
    <div>
        <h1 class="mt-5 display-2 text-uppercase text-xs-center">Which herb should I farm?</h1>
        <h6
            class="my-2 title grey--text text-uppercase text-xs-center"
        >Here we assume that you average 9 herbs per patch</h6>
        <v-container class="my-3">
            <v-layout>
                <v-flex>
                    <v-card>
                        <v-card-title class="text-uppercase">snapdragon</v-card-title>
                        <v-card-text>{{snapdragon}}</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex>
                    <v-card>
                        <v-card-title class="text-uppercase">ranarr</v-card-title>
                        <v-card-text>{{ranarr}}</v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout class="my-5">
                <v-flex>
                    <v-card>
                        <v-card-title class="text-uppercase">Result</v-card-title>
                        <v-card-text>
                            <div>You should farm: {{currentBest}}</div>
                            <div>Margin: {{margin}}</div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import api from "@/plugins/Api";

    export default {
        data() {
            return {
                snapdragon: 0,
                ranarr: 0,
                currentBest: "",
                margin: 0
            };
        },

        created() {
            api()
                .get("/farming")
                .then(data => data.data)
                .then(data => {
                    this.snapdragon = data.snapdragon;
                    this.ranarr = data.ranarr;
                    if (this.ranarr > this.snapdragon) {
                        this.currentBest = "ranarr";
                        this.margin = this.ranarr - this.snapdragon;
                    } else if (this.snapdragon > this.ranarr) {
                        this.currentBest = "snapdragon";
                        this.margin = this.snapdragon - this.ranarr;
                    } else {
                        this.currentBest = "either";
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
</script>
