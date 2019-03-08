<template>
    <div style="height: 500px">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
              integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
              crossorigin="anonymous">
        <sunburst-chart :data='sunburstChartData'></sunburst-chart>

    </div>
</template>

<script>
    import {ChartSunburst} from 'vue-d2b'

    export default {
        name: "SunBurst",
        components: {
            'sunburst-chart': ChartSunburst
        },
        data() {
            return {
                sunburstChartData: {
                    "label": "Total de electores",
                    "children": [
                        {
                            "label": "Votaron",
                            "children": [
                                {
                                    "label": "Boletas Válidas",
                                    "children": [
                                        {"label": "Voto SI", "size": 6816169},
                                        {"label": "Voto NO", "size": 706400}
                                    ]
                                },
                                {"label": "Boletas en Blanco", "size": 198674},
                                {"label": "Boletas anuladas", "size": 127100}
                            ]
                        },
                        {
                            "label": "No Votaron",
                            "size": 857380
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
            width: 0px !important;
        }
    }
    .d2b-sunburst-breadcrumb .d2b-sunburst-value, .d2b-sunburst-tooltip .d2b-sunburst-value {
        font-size: 15px !important;
    }
</style>