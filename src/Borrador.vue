<template>
    <div class="container-fluid indrig">
        <pie-chart :options="options" :chart-data="datacollection"></pie-chart>
        <div class="row justify-content-center">

            <button v-scroll-to="sizings" type="button"  v-ripple
                    class="btn btn-info type-button"
                    @click="changeVisible('del')">
                Eliminado<br/><span :class="{marks:del}">+</span></button>
            <button v-scroll-to="sizings" type="button"  v-ripple
                    style="background-color: rgb(2,166,141)"
                    class="btn btn-info type-button"
                    @click="changeVisible('equ')">
                Igual<br/><span :class="{marks:equ}">+</span></button>
            <button v-scroll-to="sizings" type="button"  v-ripple
                    class="btn btn-info type-button"
                    style="background-color: #f89226"
                    @click="changeVisible('comp')">
                Modificado<br/><span :class="{marks:comp}">+</span></button>
            <button v-scroll-to="sizings" type="button"  v-ripple
                    class="btn btn-info type-button"
                    style="background-color: #f4d366"
                    @click="changeVisible('nu')">
                Nuevo<br/><span :class="{marks:nu}">+</span></button>
        </div>
        <br>
        <div id="listBorrador" v-for="(item, index) in contenido">
            <h1 v-if="item.tag == 'h1'" :key="index"  @click="showInside(index)" v-show="checkIfShow" :class="item.style">{{(item.inside)?"+ ":""}}{{item.texto}}</h1>
            <h2 v-else-if="item.tag == 'h2'" :key="index" v-show="checkIfShow" :class="item.style">{{item.texto}}</h2>
            <h3 v-else-if="item.tag == 'h3'" :key="index" v-show="checkIfShow" :class="item.style">{{item.texto}}</h3>
            <template v-else-if="item.tag == 'h4'">

                <h4 :key="index" :class="item.style" @click="showInside(index)">
                <!--<h4 :key="index" :class="item.style" @click="showInside(index)" v-show="checkIfVisible(item)">-->
                    <div v-if="item.important==''" class="nota-icon"></div>
                    +
                    {{item.texto}}</h4>
            </template>
            <div v-else :key="index" class="text-article container-fluid">
                <div class="row">
                    <div class="col"><p class="">{{item.texto}}</p></div>
                    <div v-if="item.compared != '' && item.type == 'comp'" class="col">
                        <p class=" article-comparable" v-html="item.compared"></p>
                    </div>
                    <div class="w-100"></div>
                </div>
            </div>

            <div v-if="item.inside" class="text-article container-fluid"
                 >
                 <!--v-show="isvisible(index) && checkIfVisible(item)">-->
                <template v-for="(art, secindex) in item.inside">
                    <div class="row">
                        <!--<div class="row" :style="backStyle" :class="realstyle(art.type)">-->


                        <div class="col"><p class="">{{art.texto}}</p></div>

                        <div class="col"><p class="">{{art.similar}}</p></div>
                        <div class="col"><p class="">{{art.new}}</p></div>

                        <div v-if="art.compared != '' && art.type == 'comp'" class="col">
                            <p class="article-comparable" v-html="art.compared"></p>
                        </div>
                        <!--<span class="badge-success">{{(art.type=='nu')?"NUEVO":""}}</span>-->
                        <!--<span class="badge-info">{{(art.type=='equ')?"IGUAL":""}}</span>-->
                        <div class="w-100"></div>
                    </div>
                </template>
            </div>

        </div>
    </div>
</template>

<script>
    import {Affix} from 'vue-affix';
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {faEye, faEyeSlash, faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
    import borrador from './assets/borrador2.json'
    import PieChart from "./PieChart";

    library.add(faEye, faEyeSlash, faChevronDown, faChevronUp)
    export default {
        name: "Borrador",
        components: {
            PieChart,
            Affix, FontAwesomeIcon
        },
        created() {
            window.addEventListener('resize', this.handleResize)
            this.handleResize();
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        },
        data() {
            let me = this
            return {
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: false,

                },
                type: "",
                cNu: 0,
                cDel: 0,
                cComp: 0,
                cEqu: 0,
                del: false,
                comp: false,
                nu: false,
                equ: false,
                listvisble: [],
                datacollection: {
                    labels: ["Párrafos modificados", "Párrafos iguales", "Párrafos nuevos"],
                    datasets: [
                        {
                            backgroundColor: [
                                "#f89226",
                                "rgb(2,166,141)",
                                "#f4d366",

                            ],
                            data: me.percents(),

                            dataLabels: {
                                distance:10
                            }
                        }
                    ]
                },
                contenido: borrador,
                backStyle: {
                    color: "#00000075",
                }
            }
        },
        computed: {
            sizings: function () {
                if (this.widths < 468)
                    return "#listBorrador"
                return false
            },
            checkIfShow: function () {
                return ((this.type == 'equ' && this.equ) || (this.type == 'comp' && this.comp) || (this.type == 'nu' && this.nu))
            }
        },
        methods: {
            realstyle(type){
                if ((type == 'equ' && this.equ) || (type == 'comp' && this.comp) || (type == 'del' && this.del) || (type == 'nu' && this.nu)) {
                    return 'black-color'
                }
                return ""
            },
            checkIfVisible(item) {
                if (item.inside)
                    for (let el of item.inside) {
                        if ((el.type == 'equ' && this.equ) || (el.type == 'comp' && this.comp) || (el.type == 'del' && this.del) || (el.type == 'nu' && this.nu)) {
                            return true
                        }
                    }
            },
            handleResize() {
                this.widths = window.innerWidth;
            },
            getValue(type) {
                switch (type) {
                    case "comp": {
                        return this.comp
                    }
                    case "nu": {
                        return this.nu

                    }
                    case "del": {
                        return this.del
                    }
                    case "equ": {
                        return this.equ
                    }

                }
            },
            percents() {
                let countEqu = 0
                let countComp = 0
                let countNu = 0
                let countDel = 0
                let total = 0
                for (let el of borrador) {
                    if (el.inside) {
                        for (let bel of el.inside) {
                            total++

                            if (bel.type == 'comp') {
                                countComp++;
                            }
                            if (bel.type == 'equ') {
                                countEqu++;
                            }
                            if (bel.type == 'nu') {
                                countNu++;
                            }
                        }
                    }
                }
                this.cEqu = countEqu;
                this.cNu = countNu;
                this.cDel = countDel;
                this.cComp = countComp;
                return [countComp, countEqu, countNu]
            },
            changeVisible(type) {
                this.type = type;
                switch (type) {
                    case "comp": {
                        this.comp = true;
                        this.equ = false;
                        this.nu = false;
                        this.del = false;
                        break;
                    }
                    case "nu": {
                        this.comp = false;
                        this.equ = false;
                        this.nu = true;
                        this.del = false;
                        break;
                    }
                    case "del": {
                        this.comp = false;
                        this.equ = false;
                        this.nu = false;
                        this.del = true;
                        break;
                    }
                    case "equ": {
                        this.comp = false;
                        this.equ = true;
                        this.nu = false;
                        this.del = false;
                        break;
                    }

                }
            },
            showInside(index) {
                this.listvisble.splice(index, 1, !this.listvisble[index])
            },
            isvisible(index) {
                this.listvisble[index] = (this.listvisble[index] == undefined || this.listvisble[index] == false) ? false : true
                return this.listvisble[index]
            }
        }
    }

</script>

<style scoped>
    .all-const {
        max-width: 1000px;
        margin: 0px auto;
    }

    @media (min-width: 320px) and (max-width: 480px) {
        .sidebar-men {
            bottom: 20px !important;
            z-index: 999999999999;
            top: unset !important;
        }

    }

    @media (min-width: 481px) and (max-width: 768px) {
        .sidebar-men {
            padding-top: 20px !important;
            z-index: 999999999999;
        }
    }

    .marks {
        font-size: 20px !important;
        color: rgb(78, 78, 78) !important;
        transition: all ease-out .4s;

    }
    .black-color {
        color: black !important;
    }
    .marks span {
        color: white !important;


    }

    .explicative-type {
        margin: 20px auto;
        color: #f89226;
        max-width: 800px;
        font-size: 15px;
        text-align: justify;
        transition: all .5s;
    }

    .affix-top {
        position: absolute;
    }

    h1.titulo {
        font-family: TradeGothicLTStd;
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.2px;
        text-align: left;
        color: #4c768c;
        max-width: 650px;
        cursor: pointer;
        text-transform: uppercase;
        margin: 5px auto;
    }

    h2.capitulo {
        font-family: TradeGothicLTStd;
        font-size: 19.5px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.2px;
        text-align: left;
        text-transform: uppercase;

        color: #4c768c;
        max-width: 630px;
        margin: 5px auto;
    }

    h3.seccion {
        font-family: TradeGothicLTStd;
        font-size: 17px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.2px;
        text-align: left;
        text-transform: uppercase;
        color: #4c768c;
        max-width: 625px;
        margin: 5px auto;
    }

    h4.articulo {
        font-family: TradeGothicLTStd-Bold;
        font-size: 19.5px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.2px;
        text-align: left;
        text-transform: uppercase;
        color: #4c768c;
        padding-left: 20px;
        max-width: 630px;
        margin: 5px auto;
        display: flex;
    }

    .article-comparable >>> del {
        color: #ff0000
    }

    .article-comparable >>> ins {
        background-color: #f4d366;
    }

    h4.nota {
        color: #f89226;
        font-family: TradeGothicLTStd-Bold;
        font-weight: bold;
    }

    .nota-articulo {
        color: #f89226;
        font-family: TradeGothicLTStd-Bold;
        font-weight: bold;

    }

    .btn {
        display: inline-block;
        font-weight: 200;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 0px;
        width: 157px;
        height: 50px;
        padding: 12px;
        font-size: 1rem;
        line-height: 1;
        border-radius: 0px;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }

    .btn span {
        color: #ffffff;
        font-family: TradeGothicLTStd;
        font-size: 16px;
        font-weight: bold;
    }

    .bounce-enter-active {
        animation: bounce-in .5s;
    }

    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    .art-list-move {
        transition: transform 1s;
    }

    .text-article {
        transition: all .5s;
        font-family: TradeGothicLTStd;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.2px;
        text-align: justify;
        color: #1b1d1e;
        /*max-width: 680px;*/
        max-width: 1200px;
        margin: 20px auto;
    }

    .nota-icon {
        height: 24px;
        left: 5px;
        width: 25px;
        background-image: url(/dist/assets/search.jpg);
        margin-left: -25px;
    }

    .articulo {
        cursor: pointer;
    }

    .v-progress-circular {
        margin: 1rem;
    }

    .v-progress-circular__underlay {
        stroke: rgb(51, 204, 178);
    }

    h1.title-circle {
        font-family: TradeGothicLTStd-Bold;
        margin-top: 15px;
        font-size: 32px;
    }

    .openall {
        color: #33ccb2;
        font-family: TradeGothicLTStd-Bold;
        text-transform: uppercase;
        cursor: pointer;
        text-align: left;
        font-size: 17px
    }

    .sidebar-men {
        text-align: center;
        float: right;
    }

    button.type-button {
        background-color: #3d6277;
        color: #ffffef;
        font-family: TradeGothicLTStd-Bold;
        text-transform: uppercase;
        font-size: 18px;
        letter-spacing: 4px;
        margin: 10px 15px;
    }
    .col{
        border: 1px solid black;
    }
</style>