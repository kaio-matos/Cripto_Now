import { defineComponent, h, ref, watchEffect } from 'vue'

import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
} from 'chart.js'
import { convertDate } from '@/utils/date'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
)

export default defineComponent({
    name: 'LineChart',
    components: {
        Line
    },
    props: {
        chartId: {
            type: String,
            default: 'line-chart'
        },
        history: {
            type: Array,
            default: () => []
        },
    },
    setup(props) {
        let chartData = ref({
            labels: [],
            datasets: [
                {
                    label: props.name,
                    backgroundColor: 'rgb(251 191 36)',
                    data: []
                }
            ]
        })

        watchEffect(() => {
            chartData = {
                labels: props.history.map(([date]) => convertDate(new Date(date))),
                datasets: [
                    {
                        label: "Price R$",
                        backgroundColor: 'rgb(251 191 36)',
                        borderColor: 'rgb(251 191 36)',


                        data: props.history.map(([, price]) => price)
                    }
                ],
            }
        })

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false
        }

        return () =>
            h(Line, {
                chartData,
                chartOptions,
                chartId: props.chartId,
            })
    }
})
