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

 
Vue.use(Vuetify)
Vue.use(BootstrapVue)


new Vue({
  el: '#app',
  components: {
    Donut, Const
},
  // render: h => h(App)
})
