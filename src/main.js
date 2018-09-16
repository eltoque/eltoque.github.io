import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
// import App from './App.vue'
import {Line} from "vue-chartjs"
import Vuetify from 'vuetify'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import 'vuetify/dist/vuetify.min.css'

import Donut from "./Donut.vue"
import Const from "./Const.vue"
import Rights from "./Rights.vue"
import Navbar from "./Navbar.vue"
import Topic from "./Topic.vue"

import "./styles.css"


Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: {
    Donut, Const, Rights, Navbar,Topic
},
  // render: h => h(App)
})
