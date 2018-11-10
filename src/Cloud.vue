<template>
    <div class="cloud-component">
        <div class="row">
            <div class="listTopics col-lg-2">
                <template v-for="med in medialist">
                    <button type="button" :class="isselected(med)" v-ripple class="btn btn-info cloud-btn"
                            @click="updateMedio(med)"> {{med}}
                    </button>
                </template>
            </div>
            <div class="col-lg-10">
                <div class="axes" ref="axes" v-show="topic"></div>

                <canvas :width="width" v-show="!topic" :height="height" class="wordCloud" ref="wordCloud"></canvas>
                <div class="legend-color">
                    <div v-ripple class="box-color" style="background-color: rgb(184,184,194)" @click="showlabel(1)"
                    ></div>
                    <transition name="fade"><div v-show="label(1)">No aparece en el proyecto</div></transition>
                    <div v-ripple class="box-color" style="background-color: rgb(255,0,0)" title="Negativo"
                         @click="showlabel(2)"></div>
                    <transition name="fade"><div v-show="label(2)">Negativo</div></transition>
                    <div v-ripple class="box-color" style="background-color: rgb(277,78,0)"
                         title="Predominantemente Negativo" @click="showlabel(3)"></div>
                    <transition name="fade"><div v-show="label(3)">Predominantemente Negativo</div></transition>
                    <div v-ripple class="box-color" style="background-color: rgb(204,113,36)" title="Neutro"
                         @click="showlabel(4)"></div>
                    <transition name="fade"><div v-show="label(4)">Neutro</div></transition>
                    <div v-ripple class="box-color" style="background-color: rgb(46,212,186)"
                         title="Predominantemente positivo" @click="showlabel(5)"></div>
                    <transition name="fade"><div v-show="label(5)">Predominantemente positivo</div></transition>
                    <div v-ripple class="box-color" style="background-color: rgb(43,175,151)" title="Positivo"
                         @click="showlabel(6)"></div>
                    <transition name="fade"><div v-show="label(6)">Positivo</div></transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import datos from './assets/nube.json';
    import * as  wc from 'wordcloud'
    import * as d3 from "d3";


    export default {
        name: "Cloud",
        data() {
            return {
                textos: datos,
                padding: 1,
                width: 800,
                temasaxis: [],
                height: 500,
                medio: "Todos",
                types: {},
                rotate: 0,
                labelshowing: null,
                topic: null,
                colors: {
                    0: "rgb(184,184,194)",
                    1: "rgb(255,0,0)",
                    2: "rgb(277,78,0)",
                    3: "rgb(204,113,36)",
                    4: "rgb(46,212,186)",
                    5: "rgb(43,175,151)",
                }

            }
        },
        mounted() {
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
            label: function (id) {
                return this.labelshowing == id
            },
            showlabel: function (id) {
                if (this.labelshowing == id)
                    this.labelshowing = null
                else
                    this.labelshowing = id
            },
            drawGraph: function (type) {
                let medias = this.medialist.slice(1)
                let topics = this.temasaxis
                let me = this;
                var fullwidth = me.width,
                    fullheight = me.height;

                // these are the margins around the graph. Axes labels go in margins.
                var margin = {top: 20, right: 20, bottom: 20, left: 20};
                var padding = 100;

                var width = fullwidth - margin.left - margin.right,
                    height = fullheight - margin.top - margin.bottom - padding;


                d3.select(this.$refs.axes).select("svg").remove()


                var axisScaleX = d3.scalePoint()
                    .domain((type == 'topic') ? medias : topics)
                    .padding(20)
                    .range([0, width]);


                var axisScaleY = d3.scaleLinear()
                    .domain([0, 30])
                    .range([height, 0]);


                var xAxis = d3.axisBottom()
                    .scale(axisScaleX)
                    .tickSizeOuter(0)
                    .ticks(medias.length);

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

                svgContainer.append('text')
                    .attr('x', fullwidth / 2)
                    .attr('y', 20)
                    .attr("class", "title")
                    .style("text-anchor", "middle")
                    .text((type == 'topic') ? me.topic.word : me.medio);

                var heightByTipo = {}
                axisScaleX.domain()
                    .map(function (d, i) {
                        heightByTipo[d] = 1;
                    });

                let rectWidth = Math.floor(axisScaleX.range()[1] / ((type == 'topic') ? (me.medialist.length * 2) : me.wordlist.length * 2));
                let rectHeight = Math.floor(height / 30);

                //Add topics or medias on X axis
                svgContainer.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.9em")
                    .attr("y", -4)
                    .attr("transform", "rotate(-90)")


                //Add numbers to Y axis
                svgContainer.append("g")
                // .attr("transform", "translate(0,50)")
                    .call(yAxis);

                let locateY = function (d) {
                    var medioLoc = (type == "topic") ? d.medio : d.word;
                    var topping = heightByTipo[medioLoc];
                    heightByTipo[medioLoc] += 1;

                    return axisScaleY(topping);
                }


                //Change the year when moving the slider
                let updateDots = function (tipo) {

                    for (let ind in heightByTipo) {
                        heightByTipo[ind] = 1
                    }


                    let Data = (tipo == "topic") ? me.getMediaByTopic(me.topic.word) : me.getTopicByMedia(me.medio)


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
                    dots.enter().append("rect")
                        .attr("class", "dot")
                        .attr("width", rectWidth)
                        .attr("height", rectHeight)
                        .style("fill", function (d) {
                            return d.color;
                        })
                        // .on("click", showTooltip)
                        // .on("mouseout", hideTooltip)
                        .attr("x", function (d) {
                            return (axisScaleX((tipo == "topic") ? d.medio : d.word) - rectWidth / 2);
                        })
                        .attr("y", function (d) {
                            return axisScaleY(1);
                        })
                        .style("opacity", 0)
                        .transition().duration(500)
                        .attr("x", function (d) {
                            return (axisScaleX((tipo == "topic") ? d.medio : d.word) - rectWidth / 2);
                        })
                        .attr("y", function (d) {
                            return locateY(d);
                        })
                        .transition().duration(500).delay(function (d, i) {
                        return i / 2;
                    })
                        .style("opacity", 1);


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
                this.drawGraph('medio')
            },
            createCanvas: function () {
                let me = this;
                wc(this.$refs.wordCloud, {
                    list: this.wordlist,
                    gridSize: 5,
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
                        me.medio = null
                        me.topic = item
                        me.drawGraph('topic')
                    }
                    // backgroundColor: '#FFF'
                });
            },
            getMediaByTopic: function (tema) {
                let wordlist = []
                for (let text of this.textos) {
                    for (let topic of text.temas) {
                        if (topic.denom == tema) {
                            wordlist.push({
                                medio: text.medio,
                                color: this.colors[topic.clasif],
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
            getTopicByMedia: function (media) {
                let wordlist = []
                for (let text of this.textos) {
                    for (let topic of text.temas) {
                        if (text.medio == media) {
                            wordlist.push({
                                word: topic.denom,
                                color: this.colors[topic.clasif],
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
            }
        },
        computed: {
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
                        for (let topic of text.temas) {
                            if (wordlist[topic.codtema]) {
                                wordlist[topic.codtema].weight++
                                wordlist[topic.codtema].attributes.push(topic.clasif)
                            } else {
                                wordlist[topic.codtema] = {word: topic.denom, weight: 1, attributes: [topic.clasif]}
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
    .texto {
        cursor: pointer !important;
    }

    .texto:hover {
        font-size: 2em !important;
        transition: 0.2s !important;
    }

    .cloud-btn {
        font-size: 15px;
        font-family: TradeGothicLTStd-Bold;
        background-color: #3d6277;
        font-weight: bold;
        letter-spacing: 0.5px;
        color: #f2f2f2;
        text-align: center;
        margin: 1px 10px;
        width: 160px;
        text-transform: uppercase;
        user-select: none;
        border: 0px;
        height: 32px;
        border-radius: 0px;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
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
        width: 30px;
        height: 20px;
        margin: 5px 10px;
        cursor: pointer;
    }

    .btn-select {
        background-color: #f89226;
    }

    .wordCloud {
        margin: 5px auto;
        /*width: 100%;*/
        /*display: block;*/
        /*position: relative;*/
        /*overflow: hidden;*/
    }

    .axes {
        /*position: absolute;*/
    }

    .wordCloud:hover {
        cursor: pointer;
    }
</style>