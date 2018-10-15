import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
// import App from './App.vue'
import {Line} from "vue-chartjs"
import Vuetify from 'vuetify'


import 'buefy/dist/buefy.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "vue-material-design-icons/styles.css"
import "./styles.css"
import "./animate.css"
import 'vuetify/dist/vuetify.min.css'


import Donut from "./Donut.vue"
import Const from "./Const.vue"
import Rights from "./Rights.vue"
import LawCards from "./LawCards.vue"
import Topic from "./Topic2.vue"
import Comment from "./Comment.vue"
import FixedBar from "./FixedBar.vue"
import OtherArticles from "./OtherArticles.vue"
import CommentButton from "./CommentButton.vue"
import Autocomplete from 'buefy/dist/components/autocomplete'
import Toast from 'buefy/dist/components/toast'
import VueWow from 'vue-wow'
import VueAnalytics from 'vue-analytics'

var VueScrollTo = require('vue-scrollto');
var SocialSharing = require('vue-social-sharing');
Vue.use(SocialSharing);

import Navbar from "./Navbar.vue"
import {
    faFileDownload,
} from '@fortawesome/free-solid-svg-icons';
import {dom} from '@fortawesome/fontawesome-svg-core'
import {library} from '@fortawesome/fontawesome-svg-core'

Vue.use(VueWow)
Vue.use(Autocomplete)
Vue.use(Toast)
Vue.use(VueScrollTo, {
    offset: -55,
})
Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.use(VueAnalytics, {
    id: 'UA-54853009-1',
    autoTracking: {
        screenview: true
    }
})

library.add(faFileDownload)
dom.watch()

new Vue({
    el: '#app',

    components: {
        Donut, Const, Rights, Navbar, Topic, Comment, FixedBar, CommentButton, OtherArticles, LawCards
    },
    methods: {
        onScroll(e) {
            if (this.$el.querySelector("#question1").getBoundingClientRect().top - 55 > 0) {
                this.activeSect = 0
            }
            this.offsetSect1 = this.$el.querySelector("#question1").getBoundingClientRect().top - 55
            this.offsetSect2 = this.$el.querySelector("#question2").getBoundingClientRect().top - 55
            this.offsetSect3 = this.$el.querySelector("#question3").getBoundingClientRect().top - 55
            this.offsetSect4 = this.$el.querySelector("#question4").getBoundingClientRect().top - 55
        },
        openmeth: function(){

        },
        open: function(url){
            switch (url) {
                case "meth": window.open('https://eltoque.com/como-construimos-el-especial-de-la-constitucion','_blank'); break;
                case "proy": window.open('https://constitucion.eltoque.com/proyecto.html','_blank'); break;
                case "vig": window.open('https://constitucion.eltoque.com/vigente.html','_blank'); break;
                case "off": window.open('https://constitucion.eltoque.com/dist/assets/offline.zip','_blank'); break;
            }

        },
        getValue: function (el) {
            this.activeSect = el
        },
        track () {
            this.$ga.page('/')
        }
    },
    data() {
        this.track();
        return {
        offsetSect1: 0,
        offsetSect2: 0,
        offsetSect3: 0,
        offsetSect4: 0,
        activeSect: 0,
    }}
    // render: h => h(App)
})
