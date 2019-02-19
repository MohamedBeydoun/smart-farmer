<template>
    <div id="comparaor">
        <div v-if="!submitted">
            <h1
                class="mt-5 display-2 text-uppercase text-xs-center"
            >Which two herbs do you want to compare?</h1>
            <v-card class="ma-5 px-5 py-2">
                <v-form class="my-5 mx-3">
                    <v-text-field label="1st Herb" v-model="herb1.name"></v-text-field>
                    <v-text-field label="2nd Herb" @keyup.enter="submit" v-model="herb2.name"></v-text-field>
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
            </v-container>
        </div>
    </div>
</template>

<script>
    import api from "@/plugins/Api";

    export default {
        data() {
            return {
                herb1: {
                    name: "",
                    price: 0
                },
                herb2: {
                    name: "",
                    price: 0
                },
                currentBest: "",
                margin: 0,
                submitted: false
            };
        },

        created() {},

        methods: {
            submit() {
                api()
                    .get(
                        "/farming/" +
                            this.herb1.name.toLowerCase().replace(/ /g, "_") +
                            "/" +
                            this.herb2.name.toLowerCase().replace(/ /g, "_")
                    )
                    .then(data => data.data)
                    .then(data => {
                        this.herb1.price = data.herb1Price;
                        this.herb2.price = data.herb2Price;
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
