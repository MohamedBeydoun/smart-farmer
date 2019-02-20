<template>
    <div id="comparaor">
        <div v-if="!submitted">
            <h1
                class="mt-5 display-2 text-uppercase text-xs-center"
            >Which two herbs do you want to compare?</h1>
            <v-card class="ma-5 px-5 py-2">
                <v-form class="my-5 mx-3">
                    <v-text-field label="1st Herb" color="black" v-model="herb1.name"></v-text-field>
                    <v-text-field
                        label="2nd Herb"
                        color="black"
                        @keyup.enter="submit"
                        v-model="herb2.name"
                    ></v-text-field>
                    <v-btn
                        :loading="isLoading"
                        class="black white--text text-uppercase"
                        @click="submit"
                    >Submit</v-btn>
                </v-form>
            </v-card>
        </div>
        <div v-if="submitted">
            <h1
                class="mt-5 display-2 text-uppercase text-xs-center"
            >compare two herbs that you wish to farm</h1>
            <h6
                class="my-2 title grey--text text-uppercase text-xs-center"
            >Here we assume that you average 9 herbs per patch</h6>
            <v-container class="my-3">
                <v-layout>
                    <v-flex>
                        <v-card>
                            <v-card-title class="text-uppercase">{{herb1.name}}</v-card-title>
                            <v-card-text>{{herb1.price}}</v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex>
                        <v-card>
                            <v-card-title class="text-uppercase">{{herb2.name}}</v-card-title>
                            <v-card-text>{{herb2.price}}</v-card-text>
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
                <v-layout class="mb-5">
                    <v-flex>
                        <vue-frappe
                            title="HERBS"
                            id="herb1Chart"
                            type="line"
                            :labels="herb1.graph.labels"
                            :height="450"
                            :colors="['#008F68', '#FAE042']"
                            :lineOptions="{regionFill: 1, dotSize: 3}"
                            :dataSets="[
                            {name: herb1.name.toUpperCase(), values: herb1.graph.values}, 
                            {name: herb2.name.toUpperCase(), values: herb2.graph.values}
                            ]"
                            :xIsSeries="1"
                            xAxisMode="span"
                            yAxisMode="tick"
                        ></vue-frappe>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex>
                        <vue-frappe
                            title="SEEDS"
                            id="seed1Chart"
                            type="line"
                            :labels="herb1.graph.labels"
                            :height="450"
                            :colors="['#008F68', '#FAE042']"
                            :lineOptions="{regionFill: 1, dotSize: 3}"
                            :dataSets="[{name: herb1.name.toUpperCase(), values: herb1.graph.seedValues}, {name: herb2.name.toUpperCase(), values: herb2.graph.seedValues}]"
                            :xIsSeries="1"
                            xAxisMode="span"
                            yAxisMode="tick"
                        ></vue-frappe>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
    import api from "@/plugins/Api";
    import { Chart } from "frappe-charts";

    export default {
        data() {
            return {
                herb1: {
                    name: "",
                    price: 0,
                    graph: {
                        labels: [],
                        values: [],
                        seedLabels: [],
                        seedValues: []
                    }
                },
                herb2: {
                    name: "",
                    price: 0,
                    graph: {
                        labels: [],
                        values: [],
                        seedLabels: [],
                        seedValues: []
                    }
                },
                currentBest: "",
                margin: 0,
                submitted: false,
                isLoading: false
            };
        },

        methods: {
            async submit() {
                this.isLoading = true;
                await api()
                    .get(
                        "/farming/" +
                            this.herb1.name.toLowerCase().replace(/ /g, "_") +
                            "/" +
                            this.herb2.name.toLowerCase().replace(/ /g, "_")
                    )
                    .then(data => data.data)
                    .then(data => {
                        this.herb1.price = data.herb1.price;
                        this.herb2.price = data.herb2.price;
                        this.herb1.graph.labels = data.herb1.labels;
                        this.herb1.graph.values = data.herb1.values;
                        this.herb2.graph.labels = data.herb2.labels;
                        this.herb2.graph.values = data.herb2.values;
                        this.herb1.graph.seedLabels = data.herb1.seedLabels;
                        this.herb1.graph.seedValues = data.herb1.seedValues;
                        this.herb2.graph.seedLabels = data.herb2.seedLabels;
                        this.herb2.graph.seedValues = data.herb2.seedValues;

                        if (this.herb2.price > this.herb1.price) {
                            this.currentBest = this.herb2.name;
                            this.margin = this.herb2.price - this.herb1.price;
                        } else if (this.herb1.price > this.herb2.price) {
                            this.currentBest = this.herb1.name;
                            this.margin = this.herb1.price - this.herb2.price;
                        } else {
                            this.currentBest = "either is good";
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                this.submitted = true;
            }
        }
    };
</script>

<style>
    /* x axis */
    .frappe-chart .x.axis .line-vertical {
        display: none;
    }
    .frappe-chart .x.axis .line-vertical,
    .frappe-chart .x.axis text {
        display: none !important;
    }
</style>
