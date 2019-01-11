import {Bar, mixins} from 'vue-chartjs'

const {reactiveProp} = mixins

export default {
    extends: Bar,
    mixins: [reactiveProp],
    name: "BarChart",
    props: {
        chartData: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    methods: {
        renderBarChart: function () {
            this.renderChart(this.chartData, this.options)
        }
    },
    mounted() {
        this.renderBarChart()
    }
}