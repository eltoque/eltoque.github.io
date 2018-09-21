<template>
    <section class="box-comment" :id="`commentbox${this.category}`">
        <h3>Deja tu comentario, duda o pregunta</h3>
        <div class="list-comments">
            <div v-if="comments.length>0">
                <template v-for="comment in comments">
                    <div class="author">{{comment.nickname}}:</div>
                    <div class="comments">{{comment.content}}</div>
                </template>
            </div>
            <div class="message-nocomment text-center" v-else>
                No existen comentarios. Sé el primero en comentar.
            </div>
        </div>
        <hr/>
        <form class="needs-validation" novalidate>
            <div class="form-row">
                <div class="col-md-12 mb-3">
                    <input type="text" v-model="nombre" class="form-control" id="validationTooltip01"
                           placeholder="Nombre:" required>
                    <input type="mail" v-model="correo" class="form-control" id="validationTooltipUsername"
                           placeholder="Correo:" aria-describedby="validationTooltipUsernamePrepend" required>
                    <textarea type="text" placeholder="Escribe tu comentario ... " class="form-control text-comment"
                              id="validationTooltip03" v-model="comentario" required></textarea>
                </div>
            </div>
        </form>
        <div class="send text-right">
            <v-btn @click="comment()"
                   color="white"
                   v-model="fab"
                   dark
                   small
                   fab
                   bottom
                   right
            >
                <font-awesome-icon icon="paper-plane" size="lg" class="icon"></font-awesome-icon>
            </v-btn>
        </div>

    </section>
</template>

<script>
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {faPaperPlane, faAd} from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(faPaperPlane)
    library.add(faAd)
    import axios from 'axios';

    export default {
        components: {
            FontAwesomeIcon
        },
        props: ['category'],
        name: "Comment",
        data() {
            return {
                fab: false,
                correo: "",
                comentario: "",
                nombre: "",
                comments: [

                ]
            }
        },
        methods: {
            comment: function () {
                var me = this;
                axios.post('https://rssblog.herokuapp.com/comment', {
                    "nickname": this.nombre,
                    "email": this.correo,
                    "content": this.comentario,
                    "category": this.category
                })
                    .then(function (response) {
                        console.log(response.status)
                        if (response.status == 200) {
                            me.$toast.open({
                                message: 'Comentario enviado!',
                                position: 'is-bottom',
                                type: 'is-success',
                            })
                            me.nombre = "";
                            me.correo = "";
                            me.comentario = "";
                        } else {
                            me.$toast.open({
                                message: 'Ocurrió un error al enviar el comentario!',
                                position: 'is-bottom',
                                type: 'is-error'
                            })
                        }

                    })
                    .catch(function (error) {
                        me.$toast.open({
                            message: 'Ocurrió un error al enviar el comentario!',
                            position: 'is-bottom',
                            type: 'is-error'
                        })
                    });
            }
        },
        created() {
            axios.get(`https://rssblog.herokuapp.com/comment?category=${this.category}`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.comments = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        }
    }
</script>

<style scoped>

    @media (max-width: 800px) {
        .box-comment {
            padding: 40px 5% !important;
        }
    }

    .icon {
        color: red;
    }

    .send {
        margin-top: -80px;
    }

    .box-comment {
        padding: 40px 20%;
        background-color: #f2f2f2;

    }

    .list-comments {
        max-height: 300px;
        overflow-y: scroll;
    }

    .message-nocomment {
        font-family: TradeGothicLTStd-Bold;
        font-size: 21px;
        color: #a09e9e;
        padding-bottom: 20px;
        text-transform: uppercase;
    }

    .author {
        font-family: TradeGothicLTStd;
        font-size: 21px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.5px;
        text-align: left;
        color: #ec2d45;
    }

    .comments {
        padding-bottom: 15px;
        font-family: TradeGothicLTStd;
        font-size: 18px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        margin: 0px 10px 0px 0px;
        text-align: justify;
        color: rgba(64, 62, 62, 0.85);
    }

    h3 {
        padding: 10px 0px;

        font-family: TradeGothicLTStd-Bold;
        text-transform: uppercase;
        font-size: 24px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 2px;
        text-align: center;
        color: #ec2c44;
    }

    input {
        height: 36px;
    }

    input::placeholder, textarea::placeholder {
        color: rgba(255, 0, 0, .5);
        font-size: 16px;

    }

    input, textarea {
        border-radius: 0px;
        border: 0px;
        margin: 5px;
        font-size: 16px;
        color: red;
    }

    .text-comment {
        height: 100px;
    }
</style>