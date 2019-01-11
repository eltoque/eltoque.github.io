<template>
    <div class="container-fluid indrig">
        <div class="row">
            <div class="col col-md-4">
                <ul class="data-elm">
                    <li v-ripple v-scroll-to="sizings" class="data-itemm" @click="clickCountry('Todos')">
                        <div :class="all?'circler':'circle'"></div>
                        Todos
                    </li>
                    <v-divider></v-divider>
                    <template v-for="(item, index) in countries">
                        <li v-ripple v-scroll-to="sizings" class="data-itemm" @click="clickCountry(item.country)">
                            <div :class="item.selected?'circler':'circle'"></div>
                            {{item.country}}
                        </li>
                        <v-divider v-if="index + 1 < countries.length"
                                   :key="`divider-${index}`"></v-divider>
                    </template>
                </ul>
            </div>
            <div class="col-md-8">
                <bar-chart id="barraderechos" class="rights-graph" :chart-data="datacollection" :options="options"></bar-chart>
            </div>
        </div>
    </div>
</template>

<script>
    import BarChart from './BarChart.js'
    import ranking from './assets/countryranking.json'

    export default {
        name: "IndexRights",
        created() {
            window.addEventListener('resize', this.handleResize)
            this.handleResize();
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        },
        components: {BarChart},

        data: () => ({
                countries: ranking,
                defaultC: ['China', 'Cuba', 'Venezuela', 'Bolivia', 'Ecuador'],
                all: false,
                datacollection: {
                    labels: ranking.filter((el) => el.selected === true).map((el) => {
                        if (el.selected)
                            return el.country
                    }),
                    datasets: [
                        {
                            label: 'Derechos',
                            backgroundColor: '#ec2c44',
                            data: ranking.filter((el) => el.selected === true).map((el) => {
                                if (el.selected)
                                    return el.rights
                            })
                        },
                        // {
                        //     label: 'Poder ejecutivo',
                        //     backgroundColor: '#7ff875',
                        //     data: ranking.filter((el) => el.selected === true).map((el) => {
                        //         if (el.selected)
                        //             return el.expower
                        //     })
                        // },
                        // {
                        //     label: 'Independencia judicial',
                        //     backgroundColor: '#6d74f8',
                        //     data: ranking.filter((el) => el.selected === true).map((el) => {
                        //         if (el.selected)
                        //             return el.judindepen
                        //     })
                        // },
                    ]
                }
                ,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            }

        ),
        computed: {
            // countries: function () {
            //     return ranking.map((el) => el.country)
            // },
            sizings: function () {
                if (this.widths < 468)
                    return "#barraderechos"
                return false
            },
            selectedCountries: function () {
                return ranking.filter((el) => el.selected === true)
            }
        },
        methods: {
            handleResize() {
                this.widths = window.innerWidth;
            },
            clickCountry(name) {
                if (name == "Todos" && !this.all) {
                    this.datacollection.labels = []
                    this.datacollection.datasets[0].data = []
                    // this.datacollection.datasets[1].data = []
                    // this.datacollection.datasets[2].data = []

                    for (let elem of ranking) {
                        this.datacollection.labels.push(elem.country);
                        this.datacollection.datasets[0].data.push(elem.rights)
                        // this.datacollection.datasets[1].data.push(elem.expower)
                        // this.datacollection.datasets[2].data.push(elem.judindepen)
                        elem.selected = true
                    }
                    this.all = true
                    this.datacollection = {
                        labels: this.datacollection.labels,
                        datasets: this.datacollection.datasets
                    };
                } else if (name == "Todos" && this.all) {
                    this.datacollection.labels = []
                    this.datacollection.datasets[0].data = []
                    // this.datacollection.datasets[1].data = []
                    // this.datacollection.datasets[2].data = []

                    for (let elem of ranking) {
                        if(this.defaultC.includes(elem.country) ){
                            this.datacollection.labels.push(elem.country);
                            this.datacollection.datasets[0].data.push(elem.rights)
                            elem.selected = true

                        }else{
                            elem.selected = false

                        }
                    }
                    this.all = false
                    this.datacollection = {
                        labels: this.datacollection.labels,
                        datasets: this.datacollection.datasets
                    };
                } else if (name !== "Cuba") {

                    const pais = ranking.find(function (el) {
                        return el.country == name
                    })

                    if (!pais.selected) {
                        this.datacollection.labels.push(pais.country);
                        this.datacollection.datasets[0].data.push(pais.rights)
                        // this.datacollection.datasets[1].data.push(pais.expower)
                        // this.datacollection.datasets[2].data.push(pais.judindepen)

                        this.datacollection = {
                            labels: this.datacollection.labels,
                            datasets: this.datacollection.datasets
                        };
                        pais.selected = true
                    } else {
                        // Remove selected country
                        const index = this.datacollection.labels.findIndex((el) => el === name)
                        this.datacollection.labels.splice(index, 1)
                        this.datacollection.datasets[0].data.splice(index, 1)
                        // this.datacollection.datasets[1].data.splice(index, 1)
                        // this.datacollection.datasets[2].data.splice(index, 1)

                        this.datacollection = {
                            labels: this.datacollection.labels,
                            datasets: this.datacollection.datasets
                        };
                        pais.selected = false

                    }

                }
            }
        }
    }

</script>

<style scoped>

    @media (max-width: 764px) {
        .data-elm {
            max-height: 200px !important;
            max-width: 100% !important;

        }

        .rights-graph {
            width: 100% !important;
        }
    }

    .rights-graph {
        width: 600px;
        height: 450px;
    }

    .data-elm {
        max-width: 250px;
        max-height: 450px;
        padding-left: 0px;
        overflow-y: scroll;
    }

    .data-itemm {
        cursor: pointer;
        padding: 5px 10px 5px 0px;
        list-style: none;
        font-family: TradeGothicLTStd;
        font-size: 14px;
        display: inline-flex;
        width: 230px;
    }

    .c-title {
        text-align: left;
        color: #9d9d9d;
        margin-top: 20px;
        font-family: TradeGothicLTStd-Bold;
    }

    .temp {
        color: #f4d366 !important;
        font-family: TradeGothicLTStd-Bold;
        margin: 0px auto;
        text-align: center;
        font-size: 20px !important;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    .circle, .circler {
        width: 9px;
        height: 9px;
        border-radius: 10px;
        margin: 4px 10px;
        background-color: #f4d366;
    }

    .circler {
        background-color: #33ccb2;
    }

    .indrig {
        max-width: 900px;
        margin-top: 50px;
    }
</style>