<template>
    <div class="all-const">
        <div class="container donuts">
            <div class="row">
                <div class="col-md-3 col- col-sm-6 text-center">
                    <v-progress-circular
                            :rotate="65"
                            :size="size"
                            :width="width"
                            :value="value4"
                            color="#fb912d"
                    >
                        <h1 class="title-circle">{{ value4 }}%</h1>

                    </v-progress-circular>
                    <br/>
                    <button type="button" v-ripple class="btn btn-info type-button" @click="changeVisible('del')">
                        Eliminado<br/><span>+</span></button>

                </div>
                <div class="col-md-3 col-sm-6  text-center">
                    <v-progress-circular
                            :rotate="65"
                            :size="size"
                            :width="width"
                            :value="value1"
                            color="#fb912d"
                    >
                        <h1 class="title-circle">{{ value1 }}%</h1>
                    </v-progress-circular>
                    <br/>
                    <button type="button" v-ripple class="btn btn-info type-button" @click="changeVisible('mod')">
                        Modificado<br/><span>+</span></button>

                </div>
                <div class="col-md-3 col-sm-6 text-center">
                    <v-progress-circular
                            :rotate="65"
                            :size="size"
                            :width="width"
                            :value="value2"
                            color="#fb912d"
                    >
                        <h1 class="title-circle">{{ value2 }}%</h1>

                    </v-progress-circular>
                    <br/>
                    <button type="button" v-ripple class="btn btn-info type-button" @click="changeVisible('add')">
                        Nuevo<br/><span>+</span></button>

                </div>
                <div class="col-md-3 col-sm-6 text-center">
                    <v-progress-circular
                            :rotate="65"
                            :size="size"
                            :width="width"
                            :value="value3"
                            color="#fb912d"
                    >
                        <h1 class="title-circle">{{ value3 }}%</h1>

                    </v-progress-circular>
                    <br/>
                    <button type="button" v-ripple class="btn btn-info type-button" @click="changeVisible('equ')">
                        Igual<br/><span>+</span></button>

                </div>

            </div>
        </div>
        <div class="container-fluid">
            <transition name="bounce" type="transition" mode="in-out" appear>
                <div class="explicative-type">{{explicative}}</div>
            </transition>

        </div>




    </div>
</template>

<script>
    export default {
        name: "Const",
        data() {
            let visble = []
            for (let i = 1; i <= 361; i++) {
                visble[i] = false;
            }
            let delEx = "Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
            return {
                explicative: delEx,
                delEx: delEx,
                equEx: "Igual " + delEx,
                addEx: "Nuevo " + delEx,
                modEx: "Modificado " + delEx,
                value1: 51.5,
                value2: 37.6,
                value3: 10.8,
                value4: 30.8,
                size: 180,
                width: 40,
                add: false,
                equ: false,
                mod: false,
                del: true,
                artvis: visble,
                addStyle: {
                    color: "#00000075"
                },
                modStyle: {
                    color: "#00000075"
                },
                equStyle: {
                    color: "#00000075"
                },
                delStyle: {
                    color: "#00000075"
                }
            };

        },
        methods: {
            showArt: function (numero) {
                this.artvis.splice(numero, 1, !this.artvis[numero])
            },
            changeVisible: function (type) {
                switch (type) {
                    case "mod": {
                        this.explicative = this.modEx;
                        this.mod = true;
                        this.equ = false;
                        this.add = false;
                        this.del = false;
                        this.addStyle = {
                            color: "#00000075"
                        }
                        this.modStyle = {
                            color: "#000000FF"
                        }
                        this.equStyle = {
                            color: "#00000075"
                        }
                        break;
                    }
                    case "add": {
                        this.explicative = this.addEx;
                        this.mod = false;
                        this.equ = false;
                        this.add = true;
                        this.del = false;
                        this.addStyle = {
                            color: "#000000FF"
                        }
                        this.modStyle = {
                            color: "#00000075"
                        }
                        this.equStyle = {
                            color: "#00000075"
                        }
                        break;
                    }
                    case "del": {
                        this.explicative = this.delEx;
                        this.mod = false;
                        this.equ = false;
                        this.add = false;
                        this.del = true;
                        break;
                    }
                    case "equ": {
                        this.explicative = this.equEx;
                        this.mod = false;
                        this.equ = true;
                        this.add = false;
                        this.del = false;

                        this.addStyle = {
                            color: "#00000075"
                        }
                        this.modStyle = {
                            color: "#00000075"
                        }
                        this.equStyle = {
                            color: "#000000FF"
                        }
                        break;
                    }

                }
            }
        }
    }
</script>

<style>
    .all-const {
        max-width: 1000px;
        margin: 0px auto;
    }

    .explicative-type {
        margin: 20px auto;
        color: #f89226;
        max-width: 800px;
        font-size: 15px;
        text-align: justify;
        transition: all .5s;
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
    }

    .article-comparable del {
        color: #ff0000
    }

    .article-comparable ins {
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
        color: #33ccb2;
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
        max-width: 680px;
        margin: 20px auto;
    }

    /*.nota-icon{*/
    /*width: 43px;*/
    /*height: 43px;*/
    /*background-image: url("/dist/assets/");*/
    /*position: absolute;*/
    /*background-color: #f89226;*/
    /*}*/
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

    button.type-button {
        background-color: #3d6277;
        color: #f89266;
        font-family: TradeGothicLTStd-Bold;
        text-transform: uppercase;
        font-size: 18px;
        letter-spacing: 4px;
    }
</style>