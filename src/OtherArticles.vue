<template>
    <flux-parallax src="/dist/assets/bg_portada.jpg" height="600px" offset="45%" type="fixed">
        <div class="content-related back-dark">
            <h2 class="other-data">TAMBIÉN PUEDES LEER</h2>
            <h3 class="other-data">Como parte de nuestra cobertura hemos publicado otros textos que complementan esta arista del tema. Aquí los ponemos a tu disposición:</h3>
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
                                        </v-carousel-item>
                                    </a>


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
                    for (let item of response.data) {
                        this.items.push({
                            link: item.link,
                            title: item.title.rendered,
                            photo: item._embedded["wp:featuredmedia"][0].source_url
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
    h5 {

        z-index: 1;
        /* text-align: center; */
        font-family: TradeGothicLTStd;
        color: white;
        /* max-width: 300px; */
        /* height: 100%; */
        font-size: 22px;
        text-align: left;
        bottom: 0px;
        position: absolute;
        text-align: center;
        padding: 10px;
        width: 100%;
    }

    @media (min-width: 320px) and (max-width: 480px) {
        .box-other {
            width: 315px !important;
            height: 230px !important;
        }
    }

    @media (min-width: 481px) and (max-width: 768px)  {
        .sidebar-men{
            padding-top: 20px !important;
            z-index: 999999999999;
        }
    }

    .back-dark {
        height: 600px;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 0;

    }

    .other-in {
        background-color: rgba(0, 0, 0, 0.7);;
        margin: 0px auto;
        height: 80px;
        bottom: 0px;
        position: absolute;
        width: 520px;
    }

    .content-related {
        padding-top: 100px;
    }

    .box-other {
        width: 560px;
        height: 350px;
        text-align: center;
        border: 20px solid white;
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
        max-width: 800px;
        margin: 10px auto;
        text-align: center;
        color: #ffffff;
    }
</style>