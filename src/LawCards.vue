<template>
    <div>
        <div :style="{display: dialoga}" class="modal-me">
        <div  class="flip-container">
            <div class="flipper">
                <div class="back text-center" :class="{correct: detail.correct }" v-show="!isflip">
                    <div @click="closedetail"  class="closebut"> <font-awesome-icon icon="window-close"  size="lg" class="icon"></font-awesome-icon></div>
                    <div class="list-laws">
                        <template v-for="itlaw in detail.laws">
                            <ul>- {{itlaw}}</ul>
                        </template>
                    </div>
                    <div class="btn more" @click="voltear()">Volver</div>
                </div>
                <div class="front text-center" :class="{correct: detail.correct }" v-show="isflip">
                    <div @click="closedetail" class="closebut"> <font-awesome-icon icon="window-close"  size="lg" class="icon"></font-awesome-icon></div>
                    <p class="detail-law">{{detail.alerts}}</p>
                    <div class="btn more" @click="voltear()">Leyes que {{detail.modification?'': 'no'}} deben cambiar</div>

                </div>
            </div>
        </div>



        </div>




        <div class="container-fluid not-big">
            <div class="text-center">
                <button type="button" :class="{bark:all}" v-ripple class="btn btn-info right-btn"
                        @click="showLaws('all')">Todos<br/>({{showmore}})
                </button>
                <button type="button" :class="{fark:corr}" v-ripple class="mark btn btn-info right-btn"
                        @click="showLaws('corr')">Mandato claro<br/>({{cantcorrect}})
                </button>
                <button type="button" :class="{risk:inc}" v-ripple class="tark btn btn-info right-btn"
                        @click="showLaws('inc')">Riesgo de deformación<br/>({{cantincorrect}})
                </button>
            </div>
            <div class="row cat-group">
                <div class="col-md-2 text-left" v-for="cat in categories">
                    <b-checkbox class="rad-category" :native-value="cat" v-model="category">{{cat}}</b-checkbox>
                </div>
            </div>
            <br/>
            <div class="row cards">
                <template v-for="(item, key) in this.datos">
                    <div v-if="key <= showmore && visible(key)" class="col-lg-3 col-md-4 col-sm-6">
                        <div :class="{correct: item.leyes.correct}" @click="alerta(key)" class="law-card">
                            <h3>+ Artículo {{item.numero}}</h3>
                            <h4 v-if="item.inciso"> Inciso: {{item.inciso}}</h4>
                            <div class="law-title">{{item.leyes.content}}</div>
                        </div>
                    </div>
                </template>
            </div>
            <!--<div class="btn more" :class="{disabled:showmore>110}" @click="vermas">Ver más</div>-->
            <!--<div class="btn more" :class="{disabled:showmore>110}" @click="vertodos">Ver todos</div>-->
        </div>
    </div>
</template>

<script>
    import datos from './assets/law.json';
    import BRadio from "buefy/src/components/radio/Radio";
    import BCheckbox from "buefy/src/components/checkbox/Checkbox";
    import BModal from "buefy/src/components/modal/Modal";
    import VueFlip from 'vue-flip'
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {faWindowClose} from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(faWindowClose)
    export default {

        name: "LawCards",
        components: {BModal, BCheckbox, BRadio, VueFlip, FontAwesomeIcon},
        data() {
            let showmore = 0;
            let cantcorrect = 0;
            let cantincorrect = 0;
            let categories = []
            for (let cat of datos) {
                showmore++
                if (cat.leyes.correct) {
                    cantcorrect++
                } else {
                    cantincorrect++
                }
                if (categories.indexOf(cat.leyes.clasificacion) == -1) {
                    categories.push(cat.leyes.clasificacion)
                }
            }
            return {
                showmore: showmore,
                cantcorrect: cantcorrect,
                cantincorrect: cantincorrect,
                category: [],
                datos: datos,
                isflip: false,
                categories: categories,
                detail: {},
                dialoga: 'none',
                all: true,
                corr: false,
                inc: false
            }
        },
        methods: {
            visible: function (index) {

                if (this.category.length > 0) {
                    if (this.category.includes(this.datos[index].leyes.clasificacion) && this.all)
                        return true
                    if (this.category.includes(this.datos[index].leyes.clasificacion) && this.corr && this.datos[index].leyes.correct)
                        return true
                    if (this.category.includes(this.datos[index].leyes.clasificacion) && this.inc && !this.datos[index].leyes.correct)
                        return true
                } else {

                    if (this.all) {
                        return true
                    }
                    if (this.corr && this.datos[index].leyes.correct) {
                        return true
                    }
                    if (this.inc && !this.datos[index].leyes.correct) {
                        return true
                    }
                }
                return false
            },
            showLaws: function (status) {
                switch (status) {
                    case 'all': {
                        this.all = true
                        this.corr = false
                        this.inc = false
                        break;
                    }
                    case 'corr': {
                        this.all = false
                        this.corr = true
                        this.inc = false
                        break;
                    }
                    case 'inc': {
                        this.all = false
                        this.corr = false
                        this.inc = true
                        break;
                    }

                }
            },
            voltear: function () {
                console.log(this.isflip)
                this.isflip = !this.isflip
            },
            vermas: function () {
                if (this.showmore <= 116)
                    this.showmore += 12
            },
            vertodos: function () {
                this.showmore = 116
            },
            alerta: function (key) {
                this.isflip = true;
                this.detail = {
                    laws: this.datos[key].leyes.remisiones,
                    alerts: this.datos[key].leyes.alerts,
                    modification: this.datos[key].leyes.modification,
                    correct: this.datos[key].leyes.correct
                }
                 this.dialoga = 'block'
            },
            closedetail: function () {
                this.dialoga = 'none'
            }
        }
    }
</script>

<style scoped>


    @media (min-width: 768px) and (max-width: 1000px) {
        .not-big {
            width: 768px !important;

        }
    }

    @media (min-width: 576px) and (max-width: 768px) {
        .not-big {
            width: 500px !important;

        }

    }

    /*
      ##Device = Most of the Smartphones Mobiles (Portrait)
      ##Screen = B/w 320px to 479px
    */

    @media (min-width: 320px) and (max-width: 480px) {
        .not-big {
            width: 300px !important;
        }

    }

    .detail-law {
        font-family: TradeGothicLTStd-Bold;
        color: white;
        font-size: 16px;
        margin: 15px 5px;
        padding: 0px 35px;
        text-align: justify;
        height: 390px;
        overflow-y: auto;
    }

    .list-laws {
        color: white;
        font-size: 18px;
        padding: 0px 15px;
        margin: 10px 5px;
        text-align: center;
        height: 400px;
        overflow-y: auto;

    }
.list-laws ul{
    font-family: TradeGothicLTStd-Bold ;

}
    .right-btn {
        font-size: 15px;
        font-family: TradeGothicLTStd-Bold;
        background-color: #3d6277;
        font-weight: bold;
        letter-spacing: 0.5px;
        color: #f2f2f2;
        text-align: center;
        /*margin: 5px 5px;*/
        width: 190px;
        text-transform: uppercase;
        user-select: none;
        border: 0px;
        /*height: 35px;*/
        border-radius: 0px;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }

    .mark {
        background-color: #2db29a;
    }

    .fark, .risk, .bark {
        filter: drop-shadow(0 1px 4px rgba(0, 0, 0, .6));
    }

    .tark {
        background-color: #f89226;
    }

    .cat-group {
        margin-top: 20px;
    }

    .modal-me {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
    }

    .rad-category {
        margin: 10px;
    }

    .cards {
        overflow-y: visible;
        overflow-x: hidden;
        margin-bottom: 10px;
        height: 500px;
    }

    .not-big {
        width: 900px;
        margin: 10px auto;
        text-align: center;

    }

    h3, h4 {
        margin: 0px auto;
        font-family: TradeGothicLTStd-Bold;
        font-size: 17px;
        padding-top: 30px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.2px;
        text-align: center;
        color: #ffffff;
        text-transform: uppercase;
    }

    h4 {
        font-size: 15px;
        padding-top: 1px;
        letter-spacing: 0px;
    }

    .law-title {
        margin: 0px auto;
        font-family: TradeGothicLTStd-Bold;
        font-size: 16px;
        padding: 30px 10px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.2px;
        text-align: center;
        color: #ffffff;
        text-transform: uppercase;
    }

    .law-card {
        width: 185px;
        height: 230px;
        margin: 10px 0px;
        background-color: #f89226;
        cursor: pointer;
    }

    .law-card:hover {
        /*background: linear-gradient(to bottom, #33ccb2, #2dc5ac);*/
        transition: 0.5s;
        filter: drop-shadow(0 1px 8px rgba(0, 0, 0, .6));
    }

    .flip-container {
        perspective: 1000px;
        padding: 20px;
    }

    .flip-container.flip .flipper {
        transform: rotateY(180deg);
    }

    .flip-container, .front, .back {
        width: 400px;
        height: 500px;
        margin: 5% auto;

    }
    .backgr{
        background-color: #f89226;
    }

    /*.hide{*/
    /*display: none;*/
    /*}*/

    /* flip speed goes here */
    .flipper {
        transition: 0.6s;
        transform-style: preserve-3d;
        /*position: relative;*/
    }

    /* hide back of pane during swap */
    .front, .back {
        /*backface-visibility: hidden;*/
        position: absolute;
        top: 0;
        left: 0;
    }

    /*.hidenback{*/
    /*backface-visibility: unset;*/
    /*}*/

    /* front pane, placed above back */
    .front {
        /*z-index: 1;*/
        /* for firefox 31 */
        background-color: #33ccb2;
        transform: rotateY(0deg);
    }

    /* back, initially hidden pane */
    .back {
        /*z-index: 2;*/
        background-color: #33ccb2;
        /*transform: rotateY(180deg);*/
    }

    .correct {
        background-color: #33ccb2;
    }
    .closebut{
        color:white ;
        text-align: right;
        margin-right: 5px;
        margin-top: 5px;
        cursor: pointer;
    }

    .btn.more {
        border: 5px solid white;
        height: 40px;
        font-family: TradeGothicLTStd-Bold;
        color: white;
        width: 230px;
        font-size: 14px;
        text-transform: uppercase;
    }

</style>