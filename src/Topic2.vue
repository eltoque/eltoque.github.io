<template>
    <section class="box-topics">
        <div class="btn-list">
            <template v-for="(item, index) in buttons">
                <button type="button" :class="isselected(item.key)" v-ripple :key="index" class="btn topic-btn"
                        @click="findTopic(index)">
                    {{ item.topic }}
                </button>
            </template>
        </div>

        <b-autocomplete class="find"
                v-model="name"
                placeholder="Busca otros temas de tu interés"
                :keep-first="keepFirst"
                :open-on-focus="openOnFocus"
                :data="filteredDataObj"
                field="label"
                        icon-pack="fa"
                icon="search"
                @select="option =>{findTopic(-1); selected = option}">
        </b-autocomplete>
        <div v-if="selected">
            <!--<h3>{{name}}</h3>-->
            <transition-group name="fade">
                <div v-for="articulo in selected.articulos" :key="datos.textos[articulo].numero">
                    <h4 class="articulo">Artículo: {{datos.textos[articulo].numero}}</h4>
                    <div class="text-article container-fluid" >
                        <div class="row">
                            <div class="col">
                                <p>{{datos.textos[articulo].texto}}</p>
                                <div v-if="datos.textos[articulo].incisos && datos.textos[articulo].incisos.length>0">
                                    <template v-for="inc in datos.textos[articulo].incisos">
                                        <p>{{inc}}</p>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
        <div class="message-notopic" v-else-if="name">
            No encontramos nada sobre ese tema en el proyecto de constitución.
        </div>
    </section>
</template>

<script>
    import datas from './assets/topics.json';
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {faSearch} from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
    import {dom} from '@fortawesome/fontawesome-svg-core'
    library.add(faSearch)
    dom.watch()

    library.add(faSearch)
    export default {
        components: {
            FontAwesomeIcon,
        },
        data() {

            return {
                datos: datas,
                buttons: [
                    {
                    "topic": "Socialismo",
                    select: "btn-info",
                    key: "socialism"
                },
                    {
                        "topic": "Estado",
                        key: "state"
                    },
                    {
                        "topic": "Gobierno",
                        key: "system"
                    },
                    {
                        "topic": "Asamblea Nacional",
                        key: "housenum"
                    },
                    {
                        "topic": "Presidente de la República",
                        key: "president"
                    },
                    {
                        "topic": "Elecciones",
                        key: "election"
                    },
                    {
                        "topic": "Representantes populares",
                        key: "representates"
                    },
                    {
                        "topic": "Derechos",
                        key: "Right"
                    },
                    {
                        "topic": "Deberes",
                        key: "Deber"
                    },
                    {
                        "topic": "Economía",
                        key: "eco"
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
                return this.datos.temas.filter((option) => {
                    return option.label
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                })
            }
        },
        methods: {
            findTopic: function (index) {
                if (index >= 0) {
                    if(this.selected != null && this.selected.key == this.buttons[index].key){
                        this.selected = null
                        } else
                    for (let opt of this.datos.temas) {
                        if (opt.key == this.buttons[index].key) {
                            this.selected = opt;
                            break;
                        }
                    }
                }

            },
            isselected: function (key) {
                if(this.selected && this.selected.key ==  key)
                    return 'btn-select'
                return ""
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
        text-align: center;
        text-transform: uppercase;
    }
    .find{
        width: 500px;
        margin: 15px auto;
        padding: 10px;
        height: 50px;
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
        background-color: #33ccb2;
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
    .btn-select{
        background-color: #f89226;
    }
</style>