<template>
    <div class="container-fluid worldmap">
        <div class="row revrt">
            <div id="mapshow" class="col-lg-8 col-md-8 text-center">
                <div class="back">
                    <div class="temp" v-show="firsttime">Elige un tema</div>
                    <h1 class="big-title">{{title}}</h1>
                    <div class="description">{{desc}}</div>
                    <h2 class="c-title">{{titlec}}</h2>
                    <div class="const" v-html="constitution"></div>
                </div>
                <div>
                    <canvas ref="map"></canvas>
                </div>

            </div>
            <div class="col-lg-4 col-md-4 col-sm-12">
                <ul class="data-el">
                    <template v-for="(item, index) in datos">
                        <li v-ripple v-scroll-to="sizing" class="data-item" @click="drawMap(item)"><div class="circle"></div> {{item.title}}</li>
                        <v-divider v-if="index + 1 < datos.length"
                                   :key="`divider-${index}`"></v-divider>
                    </template>
                </ul>
            </div>
        </div>


    </div>
</template>

<script>
    import * as d3 from "d3";
    import * as d3queque from "d3-queue";
    import * as topojson from "topojson";
    import world from './assets/world-110m.json'
    import datos from './assets/constcountry.json'
    import countrys from './assets/world-country-names.json'

    export default {
        name: "Countries",
        data() {
            return {
                datos: datos,
                firsttime: true,
                width: 600,
                widths:0,
                height: 600,
                projection: d3.geoOrthographic(),
                context: null,
                countries: [],
                path: null,
                titlec: "",
                title: "",
                desc: "",
                constitution: ""
            }
        },
        created() {
            window.addEventListener('resize', this.handleResize)
            this.handleResize();
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        },
        mounted() {
            this.start();
            this.drawMap({pais: " "});
        },
        computed: {
            sizing: function () {
                if (this.widths < 468)
                    return "#mapshow"
                return false
            }
        },
        methods: {
            handleResize() {
                this.widths = window.innerWidth;
            },
            start: function () {

                let width = this.width,
                    height = this.height;

                this.projection
                    .translate([width / 2, height / 2])
                    .scale(width / 2 - 20)
                    .clipAngle(90)
                    .precision(0.6);

                var canvas = d3.select(this.$refs.map)
                    .attr("width", width)
                    .attr("height", height);

                this.context = canvas.node().getContext("2d");

                let countries = topojson.feature(world, world.objects.countries).features;
                this.countries = countries.filter(function (d) {
                    return countrys.some(function (n) {
                        if (d.id == n.id) return d.name = n.name;
                    });
                }).sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
                this.path = d3.geoPath(this.projection, this.context)


            },
            findbyPais: function (pais) {

                return this.countries.find(function (el) {
                    return el.name == pais
                })
            },
            drawMap: function (item) {
                var me = this;
                if(item.pais != " "){
                    this.firsttime = false;
                }
                var globe = {type: "Sphere"},
                    land = topojson.feature(world, world.objects.land),
                    borders = topojson.mesh(world, world.objects.countries, function (a, b) {
                        return a !== b;
                    })

                let pai = this.findbyPais(item.pais);

                me.titlec = item.pais
                me.title = item.bigtitle
                me.desc = item.desc
                me.constitution = item.constitution


                if (!pai) return;


                d3.transition()
                    .duration(1250)
                    .tween("rotate", function () {
                        var p = d3.geoCentroid(pai),
                            r = d3.interpolate(me.projection.rotate(), [-p[0], -p[1]]);
                        return function (t) {
                            me.projection.rotate(r(t));
                            me.context.clearRect(0, 0, me.width, me.height);
                            me.context.fillStyle = "rgb(230,230,230)", me.context.beginPath(), me.path(land), me.context.fill();
                            me.context.fillStyle = "#f4d366", me.context.beginPath(), me.path(pai), me.context.fill();
                            me.context.strokeStyle = "#fff", me.context.lineWidth = .5, me.context.beginPath(), me.path(borders), me.context.stroke();
                        };
                    })


            }
        }
    }
</script>

<style scoped>

    @media (max-width: 764px) {
        .data-el {
            max-width: 100% !important;
        }

        .data-item {
            width: 100% !important;
        }
        .revrt{

            -ms-flex-direction: column-reverse!important;
            flex-direction: column-reverse !important;
        }
    }

    .worldmap {
        max-width: 900px;
        margin-top: 50px;
    }
    .description{
        color: #4c768c;
        font-family: TradeGothicLTStd-Bold;
        padding: 5px 0px;
        text-align: left;
        font-size: 16px;
    }
    .big-title{
        font-family: TradeGothicLTStd-Bold;
        margin: 5px 0px 15px 0px;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.2px;
        text-align: left;
        text-transform: uppercase;
        color: #4c768c;
    }
    .const{
        text-align: left;
    }


    .back {
        position: absolute;
        max-height: 550px;
        margin-right: 30px;
        overflow-y: auto;
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
    }
    .back::-webkit-scrollbar {
        display: none;
    }

    .data-el {
        max-width: 250px;
        max-height: 550px;
        padding-left: 0px;
        overflow-y: scroll;
    }

    .data-item {
        cursor: pointer;
        padding: 5px 10px 5px 0px;
        list-style: none;
        font-family: TradeGothicLTStd;
        font-size: 14px;
        display: inline-flex;
        width: 230px;
    }
    .c-title{
        text-align: left;
        color: #9d9d9d;
        margin-top: 20px;
        font-family: TradeGothicLTStd-Bold;
    }

    .temp{
        color: #f4d366 !important;
        font-family: TradeGothicLTStd-Bold;
        margin: 0px auto;
        text-align: center;
        font-size: 20px !important;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .circle{
        width: 9px;
        height: 9px;
        border-radius: 10px;
        margin: 4px 10px;
        background-color: #f4d366;
    }
</style>