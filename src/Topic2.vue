<template>
    <section class="box-topics">
        <div class="btn-list">
            <template v-for="(item, index) in buttons">
                <button type="button" :class="item.select" v-ripple :key="index" class="btn topic-btn"
                        @click="findTopic(index)">
                    {{ item.topic }}
                </button>
            </template>
        </div>

        <b-autocomplete class="find"
                v-model="name"
                placeholder="Por ejemplo: Derechos"
                :keep-first="keepFirst"
                :open-on-focus="openOnFocus"
                :data="filteredDataObj"
                field="label"
                icon="search"
                @select="option =>{findTopic(-1); selected = option}">
        </b-autocomplete>
        <div v-if="selected">
            <!--<h3>{{name}}</h3>-->
            <transition-group name="fade">
                <template v-for="articulo in selected.articulos">

                    <h4 class="articulo" :key="articulo.numero">Artículo: {{articulo.numero}}</h4>
                    <div class="text-article container-fluid" :key="articulo.numero+500">
                        <div class="row">
                            <div class="col">
                                <p>{{articulo.texto}}</p>
                                <div v-if="articulo.incisos.length>0">
                                    <template v-for="inc in articulo.incisos">
                                        <p>{{inc}}</p>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>

                </template>
            </transition-group>
        </div>
        <div class="message-notopic" v-else-if="name">
            No encontramos nada sobre ese tema en el proyecto de constitución.
        </div>
    </section>
</template>

<script>
    import data from './assets/topics.json';

    export default {
        data() {

            return {
                data,
                buttons: [
                    {
                    "topic": "Socialismo",
                    select: "btn-info",
                    key: "socialism"
                },
                    {
                        "topic": "Estado",
                        select: "btn-info",
                        key: "state"
                    },
                    {
                        "topic": "Gobierno",
                        select: "btn-info",
                        key: "system"
                    },
                    {
                        "topic": "Asamblea Nacional",
                        select: "btn-info",
                        key: "housenum"
                    },
                    {
                        "topic": "Presidente de la República",
                        select: "btn-info",
                        key: "president"
                    },
                    {
                        "topic": "Elecciones",
                        select: "btn-info",
                        key: "election"
                    },
                    {
                        "topic": "Representantes populares",
                        select: "btn-info",
                        key: "representates"
                    },
                    {
                        "topic": "Derechos",
                        select: "btn-info",
                        key: "Right"
                    },
                    {
                        "topic": "Deberes",
                        select: "btn-info",
                        key: "Deber"
                    },
                    {
                        "topic": "Economía",
                        select: "btn-info",
                        key: "eco"
                    },
                    {
                        topic: "Comunismo",
                        select: "btn-info",
                        "key": "comunism"
                    },
                    {
                        "topic": "Matrimonio",
                        select: "btn-info",
                        "key": "marriage"
                    },
                    {
                         "topic": "Paz",
                        select: "btn-info",
                         "key": "paz"
                    }]
                ,
                keepFirst: false,
                openOnFocus: false,
                name: '',
                selected: null,
            }
        },
        computed: {
            filteredDataObj() {
                return this.data.filter((option) => {
                    return option.label
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                })
            }
        },
        methods: {
            findTopic: function (index) {
                this.buttons.map((el) => el.select = "btn-info")
                if (index >= 0) {
                    this.buttons[index].select = "btn-success"
                    for (let opt of this.data) {
                        if (opt.key == this.buttons[index].key) {
                            this.selected = opt;
                            break;
                        }
                    }
                }

            }
        }
    }
</script>


<style scoped>
    .message-notopic {
        font-family: TradeGothicLTStd-Bold;
        font-size: 21px;
        color: #a09e9e;
        padding-bottom: 20px;
        text-transform: uppercase;
    }
    .find{
        width: 500px;
        margin: 15px auto;
    }

    h4.articulo {
        font-family: TradeGothicLTStd-Bold;
        font-size: 19.5px;
        text-transform: uppercase;
        color: #4c768c;
        padding-left: 0px;
        margin: 15px 75px;
    }


    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    .box-topics {
        max-width: 800px;
        margin: 20px auto;
    }

    .btn-list {
        margin: 5px auto;
        text-align: center;
    }

    .topic-btn {
        font-size: 14px;
        font-family: TradeGothicLTStd-Bold;
        font-weight: bold;
        letter-spacing: 0.5px;
        color: #f2f2f2;
        text-align: center;
        vertical-align: middle;
        width: auto;
        margin: 5px 5px;
        text-transform: uppercase;
        user-select: none;
        border: 0px;
        height: 40px;
        border-radius: 0px;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }
</style>