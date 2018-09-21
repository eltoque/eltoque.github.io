<template>
    <div>
        <!--<div v-show="showdetail" @click="closedetail" class="all-transparent">-->
        <!--</div>-->
    <div :style="{display: showdetail}"  class="modal-me">
        <div  :class="{flip:isflip}" class="flip-container" >
            <div @click="closedetail"> Cerrar</div>

            <div class="flipper">
                    <div class="front">
                    <template v-for="itlaw in detail.laws">
                        <ul>{{itlaw}}</ul>
                    </template>
                        <div class="btn" @click="voltear()">Voltear</div>
                    </div>
                    <div class="back">

                        {{detail.alerts}}
                        <div class="btn" @click="voltear()">Voltear</div>

                    </div>
                </div>
            </div>
    </div>
        <div  class="container-fluid not-big">
            <div class="text-left">
                <button type="button" :class="{mark:all}" v-ripple class="btn btn-info right-btn" @click="showLaws('all')">Todos</button>
                <button type="button" :class="{mark:corr}" v-ripple class="btn btn-info right-btn" @click="showLaws('corr')">Correcto</button>
                <button type="button"  :class="{mark:inc}" v-ripple class="btn btn-info right-btn" @click="showLaws('inc')">Incorrecto</button>
            </div>
            <div v-for="cat in categories">
                    <b-radio name="category">{{cat}}</b-radio>
            </div>
            <br/>
            <div class="row cards">
                <template v-for="(item, key) in this.datos">
                    <div  v-if="key < showmore && visible(key)" class="col-lg-3 col-md-4 col-sm-6">
                        <div :class="{correct: item.leyes.correct}" @click="alerta(key)" class="law-card">
                            <h3>+ Artículo {{item.numero}}</h3>
                            <h4 v-if="item.inciso"> Inciso: {{item.inciso}}</h4>
                            <div class="law-title">{{item.leyes.content}}</div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="btn more" :class="{disabled:showmore>110}" @click="vermas">Ver más</div>
            <div class="btn more" :class="{disabled:showmore>110}" @click="vertodos">Ver todos</div>
        </div>
    </div>
</template>

<script>
    import datos from './assets/law.json';
    import BRadio from "buefy/src/components/radio/Radio";

    export default {

        name: "LawCards",
        components: { BRadio},
        data() {
            let categories =[]
            for(let cat of datos){
                if(categories.indexOf(cat.leyes.clasificacion)==-1){
                    if(!cat.leyes.clasificacion){
                        console.log(cat)
                    }
                    categories.push(cat.leyes.clasificacion)
                }
            }
            return {
                showmore: 8,
                datos: datos,
                isflip: false,
                categories: categories,
                detail: {},
                showdetail: 'none',
                all:true,
                corr:false,
                inc: false
            }
        },
        methods: {
            visible: function (index) {
                if(this.all){
                    return true
                }
                if(this.corr && this.datos[index].leyes.correct){
                    return true
                }
                if(this.inc && !this.datos[index].leyes.correct){
                    return true
                }
                return false
            },
            showLaws: function(status){
                switch (status) {
                    case 'all': {
                        this.all= true
                        this.corr= false
                        this.inc= false
                        break;
                    }
                    case 'corr': {
                        this.all= false
                        this.corr= true
                        this.inc= false
                        break;
                    }
                    case 'inc': {
                        this.all= false
                        this.corr= false
                        this.inc= true
                        break;
                    }

                }
            },
            voltear: function () {
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
                this.detail = {
                    laws : this.datos[key].leyes.remisiones,
                    alerts: this.datos[key].leyes.alerts
                }
                this.showdetail = 'block'
            },
            closedetail: function () {
                this.showdetail = 'none'
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

    .modal-me {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    .filterblur{
        filter: blur(0.8x);

    }
    .text-left{
        width: 800px;
        margin: 10px auto;
        text-align: center !important;
    }

    .all-transparent {
        width: 100%;
        height: 100%;
        position: absolute;
        margin: 0px auto;
        background-color: rgba(255,255,255,0.6);
        z-index: 88;
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
        background-color:  #33ccb2;
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
        z-index: 88;
    }

    .flip-container.flip .flipper {
        transform: rotateY(180deg);
    }

    .flip-container, .front, .back {
        width: 400px;
        height: 500px;
        z-index: 100;
        margin: 5% auto;

    }

    /* flip speed goes here */
    .flipper {
        transition: 0.6s;
        transform-style: preserve-3d;
        position: relative;
    }

    /* hide back of pane during swap */
    .front, .back {
        backface-visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
    }

    /* front pane, placed above back */
    .front {
        z-index: 2;
        /* for firefox 31 */
        background-color: #00c853;

        transform: rotateY(0deg);
    }

    /* back, initially hidden pane */
    .back {
        background-color: #0f81cc;

        transform: rotateY(180deg);
    }
    .correct{
        background-color: #f89226;
    }


    .btn.more {
        border: 5px solid #33ccb2;
        height: 40px;
        font-family: TradeGothicLTStd-Bold;
        color: #33ccb2;
        font-size: 14px;
        text-transform: uppercase;
    }

</style>