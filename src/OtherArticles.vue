<template>
    <flux-parallax src="/dist/assets/bg_portada.jpg" height="600px" offset="45%" type="fixed">
        <div class="content-related back-dark">
            <h2 class="other-data">Otros contenidos relacionados</h2>
            <h3 class="other-data">Como parte de la cobertura sobre el tema hemos publicado otros textos que
                complementan esta aristas del tema. Aquí los ponemos a tu disposición:</h3>
            <div class="container-fluid">
                <div class="row">
                    <div class="col text-center">
                        <div>
                            <v-carousel class="box-other"
                                        hide-delimiters
                                        next-icon="fa fa-chevron-right"
                                        prev-icon="fa fa-chevron-left"
                            >
                                <template v-for="item in items">
                                    <a :href="item.link">
                                    <v-carousel-item :src="item.photo">
                                            <div class="other-in">
                                                <h5>{{item.title}}</h5>

                                            </div>
                                    </v-carousel-item>                                        </a>


                                </template>
                            </v-carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </flux-parallax>
</template>

<script>
    import {FluxParallax} from 'vue-flux';
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
    import {dom} from '@fortawesome/fontawesome-svg-core'
    import axios from 'axios';

    dom.watch()
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    // import data from './assets/posts.json';

    library.add(faChevronRight, faChevronLeft)
    export default {
        props: ["tag"],
        data() {
            return {
                items: []
            }
        },
        components: {
            FluxParallax, FontAwesomeIcon
        },
        created() {
            axios.get(`https://eltoque.com/wp-json/wp/v2/posts/?_embed=1&tags=${this.tag}`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    for (let item of response.data){
                        this.items.push({
                            link: item.link,
                            title: item.title.rendered,
                            photo:item._embedded["wp:featuredmedia"][0].source_url
                        })
                    }
                })
                .catch(e => {
                    // this.errors.push(e)
                })
        },
        name: "OtherArticles"
    }
</script>

<style scoped>
    h5{
        z-index: 1;
        text-align: center;
        font-family: TradeGothicLTStd;
        color: white;
        margin: 0px auto;
        max-width: 300px;
        padding-top: 60px;
        text-align: center;
        font-size: 22px;
    }
    .back-dark {
        height: 600px;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 0;

    }

    .other-in {
        background-color:  rgba(0, 0, 0, 0.7);;
        margin: 0px auto;
        height: 280px;
        width: 400px;
    }

    .content-related {
        padding-top: 100px;
    }

    .box-other {
        width: 400px;
        height: 280px;
        text-align: center;

        /*background-color: white;*/
        margin: 10px auto;
    }

    h2.other-data {
        font-family: TradeGothicLTStd-Bold;
        font-size: 33px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 3.3px;
        text-align: center;
        color: #ffffff;
        text-transform: uppercase;
    }

    h3.other-data {
        font-family: TradeGothicLTStd-Bold;
        font-size: 22px;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        max-width: 600px;
        margin: 10px auto;
        text-align: center;
        color: #ffffff;
    }
</style>