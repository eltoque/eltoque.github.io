<template>
    <div class="cloud-component">
        <div class="row">
            <div class="listTopics col-lg-2">
                <template v-for="med in medialist">
                    <div @click="updateMedio(med)"> {{med}}</div>
                </template>
            </div>

            <div class="wordCloud col-lg-6" ref="wordCloud" v-resize:debounce="update"></div>
        </div>
    </div>
</template>

<script>
    import datos from './assets/nube.json';
    import * as d3 from "d3";
    import * as scales from "d3-scale";
    import resize from 'vue-resize-directive'
    import * as cloud from 'd3-cloud';

    export default {
        name: "Cloud",
        directives: {
            resize,
        },
        data() {
            return {
                layout: null,
                vis: null,
                svg: null,
                textos: datos,
                padding: 1,
                width: 800,
                height: 600,
                medio: null,
                // fontSizeMapper: word => Math.log2(word.value)*10,
                fontSize: null,
                rotate: 0,
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
            wordlist() {
                this.update()
            },
            width() {
                this.update()
            },
            height() {
                this.update()
            },

        },
        methods: {
            onWordClick: function (word) {
                console.log(word)
            },
            updateMedio: function (medio) {
                this.medio = medio;
            },
            createCanvas: function () {
                let w = this.width,
                    h = this.height;

                this.layout = cloud()
                    .timeInterval(Infinity)
                    .size([w, h])
                    .fontSize(function(d) {
                        return fontSize(+d.value);
                    })
                    .text(function (d) {
                        return d.text;
                    })
                    .on("end", this.draw);

                this.svg = d3.select('.wordCloud').append("svg")
                    .attr("width", this.width)
                    .attr("height", this.height)


                this.vis = this.svg.append("g")
                    .attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

                this.update()

                // const wordCounts = this.wordlist;
                //
                // d3.select('.wordCloud').selectAll('*').remove();
                //
                // const layout = cloud()
                //     .size([this.width, this.height])
                //     .words(wordCounts)
                //     .padding(this.padding)
                //     .spiral('archimedean')
                //     .rotate(this.rotate)
                //     .fontSize(this.fontSizeMapper)
                //     .on('end', this.end);
                //
                // layout.start();
            },
            update: function () {
                this.layout.spiral('archimedean');
                this.fontSize =   scales.sqrt().range([10, 100]);
                if (this.wordlist.length){
                    this.fontSize.domain([+this.wordlist[this.wordlist.length - 1].value || 1, +this.wordlist[0].value]);
                }
                this.layout.stop().words(this.wordlist).start();


            },
            draw: function (data, bounds) {
                let w = this.width,
                    h = this.height;
                let colors = this.colors;
                this.svg.attr("width", w).attr("height", h);
                let scale = bounds ? Math.min(
                    w / Math.abs(bounds[1].x - w / 2),
                    w / Math.abs(bounds[0].x - w / 2),
                    h / Math.abs(bounds[1].y - h / 2),
                    h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

                let text = this.vis.selectAll("text")
                    .data(data, function (d) {
                        return d.text.toLowerCase();
                    });

                text.transition()
                    .duration(1000)
                    .attr("transform", function (d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .style("font-size", function (d) {
                        return d.size + "px";
                    });

                text.enter().append("text")
                    .attr("text-anchor", "middle")
                    .attr("transform", function (d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .style("font-size", function (d) {
                        return d.size + "px";
                    })
                    .transition()
                    .duration(1000)
                    .style("opacity", 1);

                text.style("font-family", function (d) {
                    return d.font;
                })
                    .style("fill", function (d) {
                        return colors[d.clasifs]
                    })
                    .text(function (d) {
                        return d.text;
                    })
                    .attr('class', 'texto')
                    .on('click', d => this.onWordClick(d));

                this.vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");


                // let cloud = d3.select('.wordCloud')
                //     .append('svg')
                //     .attr('width', this.width)
                //     .attr('height', this.height)
                //     .append('g')
                //     .attr('transform', `translate(${this.width / 2},${this.height / 2})`)
                //     .selectAll('text')
                //     .data(this.wordlist)
                //     .enter()
                //     .append('text')
                //     .style('font-size', d => {
                //         return `${d.size}px`
                //     })
                //     .style('fill', d => {
                //         return `${this.colors[d.clasifs]}`
                //     })
                //     .attr('text-anchor', 'middle')
                //     // .attr('transform', d => {
                //     //     return `translate(${[d.x, d.y]})rotate(${d.rotate})`
                //     // })
                //     .text(d => d.text)
                //     .attr('class', 'texto')
                //     .on('click', d => this.onWordClick(d));

            },
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
                let calcModa = function (array) {
                    return array[0]
                }
                let wordlist = {}
                for (let text of salida) {
                    if (!media || (media && media == text.medio) || media == "Todos") {
                        for (let topic of text.temas) {
                            if (wordlist[topic.codtema]) {
                                wordlist[topic.codtema].value++
                                wordlist[topic.codtema].clasifs.push(topic.clasif)
                            } else {
                                // wordlist[topic.codtema] = {text: topic.denom, value: 1}
                                wordlist[topic.codtema] = {text: topic.denom, value: 1, clasifs: [topic.clasif]}
                            }
                        }

                    }
                }
                let words = []
                for (let wordl in wordlist) {
                    wordlist[wordl].clasifs = calcModa(wordlist[wordl].clasifs)
                    words.push(wordlist[wordl])
                }
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

    .cloud-component {

        margin: 30px auto;

    }
</style>