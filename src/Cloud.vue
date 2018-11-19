<template>
    <div class="cloud-component">
        <transition name="fade">

            <div class="container-win" v-show="showgraph">
                <div class="graph-windows">
                    <div @click="details=showgraph=false" class="closebuton">
                        <font-awesome-icon icon="times" size="lg" class="icon"></font-awesome-icon>
                    </div>
                    <div class="title-graph">{{grahtitle}}</div>
                    <div class="note">(Haga click en un recuadro para ver más detalles.)</div>
                    <transition name="fade">
                        <div class="info-art" v-show="details" :style="{'background-color': activeColor}">
                            <div @click="details=false" class="closebuton2">
                                <font-awesome-icon icon="times" size="lg" class="icon"></font-awesome-icon>
                            </div>
                            <div class="title-art">{{title}}
                            </div>
                            <div class="authors">{{authors}}</div>
                            <div class="d-flex down">
                                <div class="d-flex justify-content-start medio">{{medios}}</div>
                                <a :href="enlace" v-show="enlace" target="_blank"
                                   class="d-flex justify-content-center link">
                                    <font-awesome-icon icon="link" class="icon" size="2x"></font-awesome-icon>
                                </a>
                                <div class="d-flex justify-content-end date">{{date}}</div>
                            </div>
                        </div>
                    </transition>
                    <div class="axes" ref="axes"></div>
                    <div class="d-flex">
                        <button type="button" class="btn btn-normal d-flex justify-content-start"
                                @mousedown="goback(true)" @mouseup="goback(false)" :disabled="(astep==0)">
                            <font-awesome-icon icon="caret-left" class="icon blucolor" size="6x"></font-awesome-icon>
                        </button>
                        <button type="button" class="btn btn-normal d-flex justify-content-end"
                                @mousedown="gonext(true)" @mouseup="gonext(false)"
                                :disabled="astep ==steps">
                            <font-awesome-icon icon="caret-right" class="icon blucolor" size="6x"></font-awesome-icon>
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <div class="row">
            <div class="listTopics col-lg-3">
                <template v-for="med in medialist">
                    <div class="btn-group">
                        <button type="button" v-scroll-to="sizing" :class="isselected(med)" v-ripple class="btn btn-info cloud-btn"
                                @click="updateMedio(med)"> {{med}}
                        </button>
                        <button type="button" :class="isselectedgraph(med)" v-ripple class="btn btn-info graph-btn"
                                @click="updateMedioGraph(med)">
                            <font-awesome-icon icon="chart-bar" class="icon"></font-awesome-icon>
                        </button>
                    </div>
                </template>
                <div><a class="noteb" href="https://eltoque.com/debates-paralelos/" target="_blank">Ver metodología</a>
                </div>
            </div>
            <div class="col-lg-9" ref="colcanvas"  id="word-cloud">
                <canvas :width="width" :height="height" class="wordCloud" ref="wordCloud"></canvas>
                <div class="legend-color">
                    <div v-ripple class="box-color" style="background-color: rgb(184,184,194)" @click="showlabel(1)"
                    ></div>
                    <div class="legend">No aparece</div>
                    <div v-ripple class="box-color" style="background-color: rgb(225,64,10)" title="Negativo"
                         @mouseover="iluminate('n')"></div>
                    <div class="legend">
                        Negativo
                    </div>
                    <div v-ripple class="box-color" style="background-color: rgb(175,101,56)"
                         title="Predominantemente Negativo" @mouseover="iluminate('pn')"></div>
                    <div class="legend">Predomina Negativo</div>
                    <div v-ripple class="box-color" style="background-color: rgb(2,166,141)" title="Neutro"
                         @mouseover="iluminate('no')"></div>
                    <div class="legend">Neutro</div>
                    <div v-ripple class="box-color" style="background-color: rgb(1,142,188)"
                         title="Predominantemente positivo" @mouseover="iluminate('pp')"></div>
                    <div class="legend">Predomina positivo</div>
                    <div v-ripple class="box-color" style="background-color: rgb(1,81,196)" title="Positivo"
                         @mouseover="iluminate('pp')"></div>
                    <div class="legend">Positivo</div>
                </div>
                <div class="note">Las valoraciones son con respecto al texto del proyecto constitucional.</div>

            </div>
        </div>
    </div>
</template>

<script>
    import datos from './assets/nube.json';
    import * as  wc from 'wordcloud'
    import * as d3 from "d3";
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {faChartBar, faTimes, faLink, faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(faChartBar)
    library.add(faTimes)
    library.add(faLink)
    library.add(faCaretLeft)
    library.add(faCaretRight)

    export default {
        name: "Cloud",
        components: {
            FontAwesomeIcon
        },
        data() {
            return {
                textos: datos,
                astep: 0,
                padding: 1,
                title: "",
                ordererMapList: null,
                activetype: "",
                authors: "",
                activeColor: "red",
                medios: "",
                date: "",
                list: [],
                timeout: null,
                enlace: "",
                temasaxis: [],
                steps: 0,
                height: 500,
                heightgraph: 400,
                startpoint: 0,
                grahtitle: "",
                details: false,
                medio: "Todos",
                types: {},
                rotate: 0,
                labelshowing: null,
                topic: null,
                showgraph: null,
                colors: {
                    0: "rgb(184,184,194)",
                    1: "rgb(225,64,10)",
                    2: "rgb(175,101,56)",
                    3: "rgb(2,166,141)",
                    4: "rgb(1,142,188)",
                    5: "rgb(1,81,196)",
                }

            }
        },
        // created(){
        //     this.width = this.$refs.colcanvas.getBoundingClientRect().width;
        // },
        mounted() {
            console.log(this.width)
            this.createCanvas()

        },
        watch: {
            width() {
                this.createCanvas()
            },
            height() {
                this.createCanvas()
            },

        },
        methods: {
            iluminate(type){

            },
            gonext: function (goahead) {
                let me = this;
                clearInterval(this.timeout)
                if (goahead) {

                    if (me.astep <= me.steps)
                        me.astep++;
                    me.drawGraph(me.activetype, true)

                    this.timeout = setInterval(function () {
                        if (me.astep <= me.steps) {
                            me.astep++;
                            me.drawGraph(me.activetype, true)
                        } else
                            clearInterval(me.timeout)


                    }, 200)
                }
            },
            goback: function (goahead) {
                let me = this;
                clearInterval(this.timeout)
                if (goahead) {

                    if (me.astep > 0)
                        me.astep--;
                    me.drawGraph(me.activetype, true)

                    this.timeout = setInterval(function () {
                        if (me.astep > 0) {
                            me.astep--;
                            me.drawGraph(me.activetype, true)
                        } else
                            clearInterval(me.timeout)


                    }, 300)
                }
            },
            label: function (id) {
                return this.labelshowing == id
            },
            showlabel: function (id) {
                if (this.labelshowing == id)
                    this.labelshowing = null
                else
                    this.labelshowing = id
            },
            drawGraph: function (type, noanim) {
                this.activetype = type;
                this.details = false
                let starter = this.startpoint;
                let size = 12;
                let medias = this.medialist.slice(1)
                let topics = this.temasaxis

                let n = (type == 'topic') ? medias.length : topics.length
                let steps = this.steps = n - size

                if (this.astep == 0)
                    this.list = (type == 'topic') ? medias : topics


                let me = this;
                var fullwidth = me.width,
                    fullheight = me.heightgraph;

                // these are the margins around the graph. Axes labels go in margins.
                var margin = {top: 20, right: 20, bottom: 20, left: 20};
                var padding = 100;

                var width = fullwidth - margin.left - margin.right,
                    height = fullheight - margin.top - margin.bottom - padding;


                let Data = (type == "topic") ? me.getMediaByTopic(me.topic.word, this.list) : me.getTopicByMedia(me.medio, this.list)

                if (this.astep == 0) {
                    let mapCount = new Map()
                    for (let el of this.list) {
                        mapCount.set(el, 0)
                    }
                    //Ordering the list
                    for (let tex of Data) {
                        mapCount.set((type == "topic") ? tex.medio : tex.word, mapCount.get((type == "topic") ? tex.medio : tex.word) + 1)
                    }

                    mapCount = this.ordererMapList= new Map(
                        Array
                            .from(mapCount)
                            .sort((a, b) => {
                                // a[0], b[0] is the key of the map
                                // return  median(b[1].clasifs) - median(a[1].clasifs);
                                return b[1] - a[1];
                            })
                    )

                    this.list = []
                    for (let el of mapCount) {
                        this.list.push(el[0])
                    }
                }


                d3.select(this.$refs.axes).select("svg").remove()

                let tempList = this.list.slice(this.astep, size + this.astep)
                var axisScaleX = d3.scalePoint()
                    .domain(tempList)
                    .padding(20)
                    .range([0, width]);

                let topY = (this.ordererMapList.get(tempList[0])>30)?this.ordererMapList.get(tempList[0]):30;

                var axisScaleY = d3.scaleLinear()
                    .domain([0, topY])
                    .range([height, 0]);


                var xAxis = d3.axisBottom()
                    .scale(axisScaleX)
                    .tickSizeOuter(0)
                    .ticks(10);

                var yAxis = d3.axisLeft()
                    .scale(axisScaleY)
                    .ticks(20)
                    .tickFormat(d3.format("d"))


                //Create the SVG Viewport selection
                var svgContainer = d3.select(this.$refs.axes).append("svg")

                    .attr("width", fullwidth)
                    .attr("height", fullheight)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


                var dotContainer = svgContainer.append("g").attr("class", "dotContainer");
                let numContainer = svgContainer.append("g").attr("class", 'numbers')

                me.grahtitle = (type == 'topic') ? me.topic.den : me.medio


                var heightByTipo = {}
                axisScaleX.domain()
                    .map(function (d, i) {
                        heightByTipo[d] = 0;
                    });

                let rectWidth = Math.floor(axisScaleX.range()[1] / (tempList.length * 2));
                let rectHeight = Math.floor(height / 32);

                //Add topics or medias on X axis
                svgContainer.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.9em")
                    .attr("y", -4)
                    .attr("transform", "rotate(-90)")


                // //Add numbers to Y axis
                // svgContainer.append("g")
                // // .attr("transform", "translate(0,50)")
                //     .call(yAxis);
                //


                let locateY = function (d) {

                    var medioLoc = (type == "topic") ? d.medio : d.word;
                    if (d.name)
                        medioLoc = d.name;


                    heightByTipo[medioLoc] += 1;
                    var topping = heightByTipo[medioLoc];

                    return axisScaleY(topping);
                }


                let updateDots = function (tipo) {
                    let Data = (type == "topic") ? me.getMediaByTopic(me.topic.word, tempList) : me.getTopicByMedia(me.medio, tempList)
                    //DATA JOIN
                    //Join new data with old elements, if any.
                    var dots = dotContainer.selectAll(".dot")
                        .data(Data
                                .sort(function (a, b) {
                                    return a.clasif - b.clasif
                                })
                            , function (d) {
                                return d.clasif;
                            });

                    //ENTER
                    dots.enter()
                        .append("rect")
                        .attr("class", "dot")
                        .attr("width", rectWidth)
                        .attr("height", rectHeight)
                        .attr("title", function (d) {
                            return d.titulo
                        })
                        .style("fill", function (d) {
                            return d.color;
                        })
                        .on("click", function (d) {
                            me.details = true;
                            me.title = d.titulo
                            me.authors = d.autor
                            me.medios = d.medio
                            me.activeColor = d.color
                            me.enlace = d.enlace
                            me.date = new Date(d.fecha).toLocaleDateString("es", {
                                month: "short",
                                day: "numeric"
                            })

                        })
                        // .on("mouseover", function (d) {
                        //     d3.select(this).style({opacity: '0.2'})
                        // })
                        .attr("x", function (d) {
                            return (axisScaleX((tipo == "topic") ? d.medio : d.word) - rectWidth / 2);
                        })
                        .attr("y", function (d) {
                            return axisScaleY(1);
                        })
                        .style("opacity", 0)
                        .transition().duration((noanim == true) ? 1 : 500)
                        .attr("x", function (d) {
                            return (axisScaleX((tipo == "topic") ? d.medio : d.word) - rectWidth / 2);
                        })
                        .attr("y", function (d) {
                            return locateY(d);
                        })
                        .transition().duration((noanim == true) ? 1 : 500)
                        .delay(function (d, i) {
                            return i / 2;
                        })
                        .style("opacity", 1);

                    let dataHeight = []
                    for (let el in heightByTipo) {
                        dataHeight.push({name: el, size: heightByTipo[el]})
                    }

                    var num = numContainer.selectAll(".num")
                        .data(dataHeight)
                        //redefine another data set, getting totals of medio/word.
                        .enter().append("text")
                        .attr("class", "bar")
                        .attr("text-anchor", "middle")
                        .style("font-size", "0.7em")
                        .attr("x", function (d) {
                            return axisScaleX(d.name);
                        })
                        .attr("y", function (d) {
                            return locateY(d);
                        })
                        .text(function (d) {
                            return (d.size > 0) ? d.size : "";
                        }).style("opacity", 0)
                        .transition().duration((noanim == true) ? 1 : 1000)
                        .style("opacity", 1);
                    ;

                }//function updateDots
                updateDots(type)


            },
            maprange: function (x) {
                let in_min = this.wordlist[this.wordlist.length - 1].weight
                let out_max = 30
                let out_min = 15
                let in_max = this.wordlist[0].weight
                if ((in_max - in_min) == 0) {
                    return out_max
                }
                return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            },
            onWordClick: function (word) {
                console.log(word)
            },
            updateMedio: function (medio) {
                this.topic = null
                this.medio = medio;
                this.createCanvas()
            },
            updateMedioGraph: function (medio) {
                this.topic = null
                this.showgraph = true;
                this.medio = medio;
                this.createCanvas()
                this.astep = 0;
                this.steps = 0;
                this.drawGraph('medio')
            },
            createCanvas: function () {
                let me = this;
                wc(this.$refs.wordCloud, {
                    list: this.wordlist,
                    gridSize: 7,
                    clearCanvas: true,
                    weightFactor: function (size) {
                        return me.maprange(size)
                    },
                    color: function (word, weight, fontSize, distance, theta) {
                        return me.colors[me.types[word]]
                    },
                    drawOutOfBound: false,
                    rotateRatio: 0,
                    fontSize: function (size) {
                        return size + 10
                    },
                    rotationSteps: 2,
                    click: function (item, dimension, event) {
                        // me.medio = null
                        me.showgraph = true;
                        me.topic = item
                        me.astep = 0;
                        me.steps = 0;
                        me.drawGraph('topic')
                    }
                    // backgroundColor: '#FFF'
                });
            },
            getMediaByTopic: function (tema, list) {
                let wordlist = []
                for (let text of this.textos) {
                    for (let topic of text.temas) {
                        if (topic.name == tema && list.includes(text.medio)) {
                            wordlist.push({
                                medio: text.medio,
                                enlace: text.url,
                                color: this.colors[topic.clasif],
                                clasif: topic.clasif,
                                fecha: text.fecha,
                                den: topic.denom,
                                titulo: text.titulo,
                                autor: text.autor,
                            })
                        }
                    }
                }
                return wordlist

            },
            getTopicByMedia: function (media, list) {
                let wordlist = []
                for (let text of this.textos) {
                    for (let topic of text.temas) {
                        if ((text.medio == media || media == "Todos") && list.includes(topic.name)) {
                            wordlist.push({
                                enlace: text.url,
                                word: topic.name,
                                den: topic.denom,
                                color: this.colors[topic.clasif],
                                medio: text.medio,
                                clasif: topic.clasif,
                                fecha: text.fecha,
                                titulo: text.titulo,
                                autor: text.autor,
                            })
                        }
                    }
                }
                return wordlist

            },
            isselected: function (key) {
                if (this.medio && this.medio == key)
                    return 'btn-select'
                return ""
            },
            isselectedgraph: function (key) {
                if (this.medio && this.medio == key)
                    return 'btn-select-graph'
                return ""
            }
        },
        computed: {
            sizing: function () {
                if (this.width < 468)
                    return "#word-cloud"
                return false
            },
            width: function(){
                return  (window.innerWidth < 800)? window.innerWidth: 800;
            },
            medialist: function () {
                let medias = new Set();
                let salida = this.textos

                for (let text of salida) {
                    medias.add(text.medio)
                }
                let exit = ["Todos"];
                for (let m of medias.entries())
                    exit.push(m[0])

                return exit;
            },
            wordlist: function () {
                let media = this.medio;
                let salida = this.textos
                //Todo: Funcion que calcula la moda dado una arreglo
                let calcModa = function (numbers) {
                    var modes = [], count = [], i, number, maxIndex = 0;

                    for (i = 0; i < numbers.length; i += 1) {
                        number = numbers[i];
                        count[number] = (count[number] || 0) + 1;
                        if (count[number] > maxIndex) {
                            maxIndex = count[number];
                        }
                    }

                    for (i in count)
                        if (count.hasOwnProperty(i)) {
                            if (count[i] === maxIndex) {
                                modes.push(Number(i));
                            }
                        }

                    return modes[0];
                }
                let wordlist = {}
                for (let text of salida) {
                    if (!media || (media && media == text.medio) || media == "Todos") {
                        if (text.temas)
                            for (let topic of text.temas) {
                                if (wordlist[topic.codtema]) {
                                    wordlist[topic.codtema].weight++
                                    wordlist[topic.codtema].attributes.push(topic.clasif)
                                } else {
                                    wordlist[topic.codtema] = {
                                        word: topic.name,
                                        den: topic.denom,
                                        weight: 1,
                                        attributes: [topic.clasif]
                                    }
                                }
                            }
                    }
                }
                let words = []
                this.types = {}
                for (let wordl in wordlist) {
                    this.types[wordlist[wordl].word] = calcModa(wordlist[wordl].attributes)
                    words.push(wordlist[wordl])
                }
                this.temasaxis = []
                for (let el in this.types) {
                    this.temasaxis.push(el)
                }

                words.sort((a, b) => b.weight - a.weight)
                return words;
            }
        }
    }
</script>

<style>
    @media (max-width: 468px) {

        .cloud-btn {
            width: 90% !important;
        }
        .graph-btn{
            width: 10% !important;
        }
        .listTopics > .btn-group{
            width: 100% !important;
        }
        .closebuton {
            margin-right: 12px !important;
        }
    }
    .dot {
        cursor: pointer;
    }

    .texto {
        cursor: pointer !important;
    }

    .texto:hover {
        font-size: 2em !important;
        transition: 0.2s !important;
    }

    .cloud-btn, .graph-btn {
        font-size: 15px;
        font-family: TradeGothicLTStd-Bold;
        background-color: #a7a7a7;
        font-weight: bold;
        letter-spacing: 0.5px;
        color: #f2f2f2;
        text-align: center;
        margin: 1px 3px 1px 0px;
        width: 160px;
        text-transform: uppercase;
        user-select: none;
        border: 0px;
        height: 32px;
        border-radius: 0px;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }

    .graph-btn {
        width: 30px;
        letter-spacing: 0px;
        padding: 0px 0px !important;
        padding-top: 4px !important;
    }

    .graph-btn .icon {
        height: auto !important;
    }

    .cloud-component {
        max-width: 1076px;
        margin: 5px auto;
    }

    .legend-color {
        font-size: 15px;
        display: flex;
        width: fit-content;
        margin: 5px auto;
    }

    .box-color {
        width: 20px;
        height: 20px;
        margin: 5px 5px;
        margin-left: 20px;
        cursor: pointer;
    }

    .btn-select {
        background-color: #f89226;
        z-index: 0 !important;
    }

    .btn-select-graph {
        background-color: #f89226;
        color: white;
        z-index: 0 !important;
    }

    .wordCloud {
        margin: 5px auto;
    }

    .axes {
        width: content-box;
        margin: 5px auto;
        overflow-y: auto;
    }

    .wordCloud:hover {
        cursor: pointer;
    }

    .container-win {
        display: block; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.8); /* Black w/ opacity */
        backdrop-filter: blur(25px);

    }

    .graph-windows {
        margin: 80px auto;
        filter: drop-shadow(0 1px 4px rgba(0, 0, 0, .6));
        max-width: 800px;
        background-color: rgb(255, 255, 255);
        z-index: 10000;
    }

    .title-graph, .title-art {
        font-size: 21px;
        font-family: TradeGothicLTStd-Bold;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        color: #33ccb2;
    }

    .title-art {
        font-size: 15px;
        color: white !important;
        margin-top: 10px;
        text-transform: uppercase;
    }

    .info-art {
        color: white !important;
        position: absolute;
        left: 50%;
        margin-left: -25%;
        z-index: 9999;
        width: 50%;
        height: 200px;
        filter: drop-shadow(0 1px 4px rgba(0, 0, 0, .4));
        background-color: white;
        padding: 20px;
    }

    .medio {
        text-align: left;
        font-weight: bold;
    }

    .date {
        text-align: right;
    }

    .authors {
        margin-top: 20px;
        text-align: center;
    }

    .down {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0px 10px;
        width: 100%;
    }

    .closebuton {
        color: #7a7a7a;
        text-align: right;
        margin-right: 5px;
        margin-top: 5px;
        cursor: pointer;
    }

    .closebuton2 {
        color: white;
        text-align: right;
        margin-right: 5px;
        margin-top: 5px;
        cursor: pointer;
    }

    .info-art .closebuton2 {
        position: absolute;
        right: 0;
        top: 0;
    }

    .link {
        padding-bottom: 10px;
    }

    a.link {
        color: white;
    }

    .legend {
        font-family: TradeGothicLTStd;
        font-size: 10px;
        line-height: 30px;

    }
    .blucolor{
        color: #33ccb2;
    }

    .noteb {
        /*text-align: center;*/
        font-size: 13px;
        font-style: italic;
        margin-top: 10px;
        color: #a8a8a8 !important;
    }

</style>