<template>
    <div class="container-fluid indrig">
        <div class="row">
            <div class="col col-md-12" style="text-align: center">
                <b-select placeholder="Seleccione una provincia" v-model="selectedItem" class="grafico">
                    <option
                            v-for="(option, index) in prov"
                            :value="index"
                            :key="index">
                        {{ option}}
                    </option>
                </b-select>
                <div class="grafic">
                    <sunburst-chart :data='sunburstChartData' :config="chartConfig"></sunburst-chart>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {ChartSunburst} from 'vue-d2b'
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {faChevronDown} from '@fortawesome/free-solid-svg-icons'

    library.add(faChevronDown)
    export default {
        name: "SunBurst",
        components: {
            'sunburst-chart': ChartSunburst
        },
        mounted() {
            setTimeout(
                function () {
                    const el = document.querySelector(".d2b-breadcrumbs-frame")
                    el.style.display = 'block'
                }, 10000
            )
        },
        data: () => ({
            datas: [
                {
                    novoto: 857380,
                    votono: 706400,
                    votosi: 6816169,
                    blanco: 198674,
                    anuladas: 127100
                }, {
                    novoto: 29627,
                    votono: 23784,
                    votosi: 380326,
                    blanco: 14204,
                    anuladas: 5379

                }, {
                    novoto: 28524,
                    votono: 31099,
                    votosi: 314356,
                    blanco: 12349,
                    anuladas: 10144

                }, {
                    novoto: 237978,
                    votono: 147380,
                    votosi: 1235178,
                    blanco: 36772,
                    anuladas: 30438

                }, {
                    novoto: 22776,
                    votono: 29151,
                    votosi: 228856,
                    blanco: 7947,
                    anuladas: 8187

                }, {
                    novoto: 52538,
                    votono: 35888,
                    votosi: 456967,
                    blanco: 9887,
                    anuladas: 8945

                }, {
                    novoto: 50070,
                    votono: 41794,
                    votosi: 497482,
                    blanco: 14694,
                    anuladas: 8136

                }, {
                    novoto: 32207,
                    votono: 20964,
                    votosi: 248007,
                    blanco: 7775,
                    anuladas: 5147

                }, {
                    novoto: 26556,
                    votono: 20651,
                    votosi: 310212,
                    blanco: 6862,
                    anuladas: 4279

                }, {
                    novoto: 27097,
                    votono: 19108,
                    votosi: 283004,
                    blanco: 6361,
                    anuladas: 3901

                }, {
                    novoto: 62022,
                    votono: 42955,
                    votosi: 473335,
                    blanco: 11356,
                    anuladas: 7772

                }, {
                    novoto: 37251,
                    votono: 39313,
                    votosi: 316983,
                    blanco: 9093,
                    anuladas: 5292

                }, {
                    novoto: 80479,
                    votono: 102161,
                    votosi: 567837,
                    blanco: 26068,
                    anuladas: 12518

                }, {
                    novoto: 55587,
                    votono: 44585,
                    votosi: 507351,
                    blanco: 13187,
                    anuladas: 6126

                }, {
                    novoto: 71378,
                    votono: 55878,
                    votosi: 635901,
                    blanco: 14572,
                    anuladas: 6549

                }, {
                    novoto: 34410,
                    votono: 46970,
                    votosi: 278851,
                    blanco: 5994,
                    anuladas: 3823

                }, {
                    novoto: 6126,
                    votono: 4321,
                    votosi: 51171,
                    blanco: 1480,
                    anuladas: 445

                }, {
                    novoto: 2754,
                    votono: 398,
                    votosi: 30352,
                    blanco: 73,
                    anuladas: 19

                }],
            selectedItem: 0,
            prov: [
                'Todas',
                'Pinar del Río',
                'Artemisa',
                'La Habana',
                'Mayabeque',
                'Matanzas',
                'Villa Clara',
                'Cienfuegos',
                'Sancti Spíritus',
                'Ciego de Ávila',
                'Camagüey',
                'Las Tunas',
                'Holguín',
                'Granma',
                'Santiago de Cuba',
                'Guantánamo',
                'Isla de la Juventud',
                'CEE Minrex'
            ],
            chartConfig(chart) {
                chart.color(d => d.color)
            },

        }),
        methods: {
            handleResize() {
                this.widths = window.innerWidth;
            },
            clickProv(item) {
                this.selectedItem = item
            }
        },
        computed: {
            sunburstChartData: function () {
                return {
                    "label": "Electores",
                    "color": 'rgb(76,118,140)',
                    "children": [
                        {
                            "label": "No Votaron",
                            "color": 'rgb(244, 211, 102)',
                            "size": this.datas[this.selectedItem].novoto
                        },
                        {
                            "label": "Votaron",
                            "color": "rgb(1,81,196)",
                            "children": [
                                {
                                    "label": "Boletas Válidas",
                                    "color": 'rgb(248, 146, 38)',

                                    "children": [
                                        {
                                            "label": "Voto NO",
                                            "color": 'rgb(2,166,141)',
                                            "size": this.datas[this.selectedItem].votono
                                        },
                                        {
                                            "label": "Voto SI",
                                            "color": 'rgb(1,142,188)',
                                            "size": this.datas[this.selectedItem].votosi
                                        }
                                    ]
                                },
                                {
                                    "label": "Boletas en Blanco",
                                    "color": "rgb(175,101,56)",
                                    "size": this.datas[this.selectedItem].blanco
                                },
                                {
                                    "label": "Boletas anuladas",
                                    "color": 'rgb(184,184,194)',
                                    "size": this.datas[this.selectedItem].anuladas
                                }
                            ]
                        }

                    ]
                }
            }
        }
    }
</script>
<style>
    /* media query to force hide breadcrumbs when the screen is too small */
    @media screen and (max-width: 500px) {
        .d2b-breadcrumbs-frame {
            display: none;
            width: 0px;
        }
    }

    .d2b-sunburst-breadcrumb .d2b-sunburst-value, .d2b-sunburst-tooltip .d2b-sunburst-value {
        font-size: 15px !important;
    }

    .d2b-breadcrumbs .d2b-breadcrumb:not(first-child):last-child .d2b-breadcrumb-icon:after {
        content: "+" !important;
        font-family: 'TradeGothicLTStd-Bold';
        line-height: 14px;
    }

    .d2b-breadcrumbs .d2b-breadcrumb:first-child .d2b-breadcrumb-icon:after {
        content: "-" !important;
        font-family: 'TradeGothicLTStd-Bold';
        line-height: 14px;

    }
</style>
<style scoped>

    @media (max-width: 764px) {
        .data-elm {
            max-height: 200px !important;
            max-width: 100% !important;

        }

        @media screen and (max-width: 500px) {
            .d2b-breadcrumbs-frame {
                display: none;
                width: 0px;
            }
        }

    }

    .grafico {
        font-family: TradeGothicLTStd-Bold;
        max-width: 300px;
        text-transform: uppercase;
        color: #33ccb2;
        font-size: 18px;
        margin-bottom: 20px;
    }

    .grafic {
        height: 400px;
    }

    .data-elm {
        max-width: 250px;
        max-height: 450px;
        padding-left: 0px;
        overflow-y: scroll;
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

    .data-itemm {
        cursor: pointer;
        padding: 5px 10px 5px 0px;
        list-style: none;
        font-family: TradeGothicLTStd;
        font-size: 14px;
        display: inline-flex;
        width: 230px;
    }

    .indrig {
        max-width: 900px;
        margin-top: 50px;
    }

    .prov-list {
        width: 300px;
        margin: 0px auto;
    }
</style>