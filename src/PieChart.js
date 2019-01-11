import {Doughnut, mixins} from 'vue-chartjs'

const {reactiveProp} = mixins

export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    name: "PieChart",
    props: {
        chartData: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null,
        }
    },
    methods: {
        rendePieChart: function () {
            this.renderChart(this.chartData, this.options)
        }
    },
    mounted() {
        this.rendePieChart()
    }
}