<template>
    <div class="container-fluid indrig">
        <div class="row revrt">
            <div id="article-lis" class="col-lg-8 col-md-8 text-center">
                <img src="/dist/assets/info.svg" alt="infografia" v-if="actualIndex==-1"/>
                <div v-if="actualTopic && actualTopic.nota" class="row">
                    <div class="col">
                        <p class="nota-articulo"  v-if="actualIndex!=-1">
                            {{actualTopic.nota}}
                        </p>
                    </div>
                </div>
                <div v-for="(item, index) in showedArt">
                    <template v-if="item.tag == 'h4'">

                        <h4 :key="index" :class="item.style">
                            {{item.texto}}

                        </h4>
                        <!--<span class="badge badge-warning">{{(item.important=='')?"importante":""}}</span>-->
                    </template>
                    <div v-if="item.inside" class="text-article container-fluid">
                        <div class="row" v-for="(art, secindex) in item.inside">
                            <div class="col">
                                <p class="text-justify">
                                    <span class="badge badge-success">{{(art.type=='nu')?"nuevo":""}}</span>
                                    <span class="badge badge-info">{{(art.type=='equ')?"igual":""}}</span>
                                    {{art.texto}}
                                </p>

                            </div>
                            <div v-if="art.compared != '' && art.type == 'comp'" class="col">
                                <p class="text-justify article-comparable"
                                   v-html="art.compared"></p>
                            </div>

                            <div class="w-100"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12">
                <affix :enabled="(!sizingl)?true:false" relative-element-selector="#article-lis" style="margin-top: 25px">
                <div>
                <ul class="data-el">
                        <template v-for="(item, index) in orderedWords">
                            <li v-ripple v-scroll-to="sizingl" class="data-item" @click="filteredArticles(item, index)">
                                <div class="circle" :class="(index == actualIndex)?'sel':''"></div>
                                {{item.word}}
                            </li>
                            <v-divider v-if="index + 1 < orderedWords.length"
                                       :key="`divider-${index}`"></v-divider>
                        </template>
                    </ul>
                </div>
                </affix>
            </div>
        </div>
    </div>
</template>

<script>
    import borrador from './assets/borrador.json'
    import datos from './assets/temas.json';
    import {Affix} from 'vue-affix'

    export default {
        name: "Temas",
        components: {Affix},
        created() {
            window.addEventListener('resize', this.handleResize)
            this.handleResize();
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        },
        data: () => ({
                wordlist: datos,
                showedArt: [],
                articles: borrador,
                textos: datos,
                actualIndex: -1,
                actualTopic: null,
            }
        ),
        computed: {
            sizingl: function () {
                if (this.widths < 468)
                    return "#article-lis"
                return false
            },
            orderedWords: () => datos.sort((a, b) => b.weight - a.weight)
        },
        methods: {
            handleResize() {
                this.widths = window.innerWidth;
            },
            filteredArticles: function (filter, index) {
                if (index == this.actualIndex) {
                    this.actualIndex = -1
                    this.showedArt = []
                } else {
                    this.actualIndex = index;
                    this.actualTopic = filter;
                    this.showedArt = this.articles.filter((el) => {
                        if (el.topics && el.topics.length > 0) {
                            return el.topics.includes(filter.den) ||  el.topics.includes(filter.word)
                        }
                    })
                }

            },
            numberArticles: function (filter) {
                return this.articles.filter((el) => {
                    if (el.topics && el.topics.length > 0) {
                        return el.topics.includes(filter.den)
                    }
                }).length
            },

        }
    }

</script>

<style scoped>

    @media (max-width: 764px) {
        .data-el {
            max-width: 100% !important;
            max-height: 400px !important;
        }

        .data-item {
            width: 100% !important;
            max-height: 400px !important;
        }

        .revrt {

            -ms-flex-direction: column-reverse !important;
            flex-direction: column-reverse !important;
        }
    }
    .nota-articulo {
        color: #f89226;
        font-family: TradeGothicLTStd-Bold;
        font-weight: bold;
        font-size: 1.2em;

    }

    #article-lis {
        min-height: 500px;
    }

    .side{
        width: 100px;
        height: 100px;
        border: 1px solid violet;
    }

    .circle {
        width: 9px;
        height: 9px;
        border-radius: 10px;
        margin: 4px 10px;
        background-color: #f4d366;
    }

    .description {
        color: #4c768c;
        font-family: TradeGothicLTStd-Bold;
        padding: 5px 0px;
        text-align: left;
        font-size: 16px;
    }

    .big-title {
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

    .const {
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
        max-height: 500px;
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
</style>