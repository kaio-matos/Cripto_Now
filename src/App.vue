<template>
  <div>
    <main-header />
    <div class="m-auto mt-[9rem] px-10 max-w-screen-xl flex gap-5">
      <!-- Pickers and price section -->
      <section class="flex flex-col flex-1 justify-between">
        <div>
          <cripto-selector class="w-2/3 mb-5" @update:cripto="updateCripto" />
          <date-time-picker class="w-2/3" @update:dateTime="updateDateTime"></date-time-picker>
        </div>

        <div>
          <p>{{ currentDateTime ? `Nearest price at ${convertDate(new Date(currentDateTime))}` : "Price now" }}</p>
          <price-holder :currentPrice="currentCriptoPrice" />
        </div>
      </section>

      <!-- Graphic visualization section -->
      <section class="flex-1 ">
        <p>Price of 30 days ago</p>
        <graph-view :history="currentCriptoHistory" />
      </section>
    </div>

  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
import CriptoSelector from '@/components/CriptoSelector.vue'
import PriceHolder from '@/components/PriceHolder.vue'
import DateTimePicker from '@/components/DateTimePicker.vue'
import GraphView from '@/components/GraphView'
import { convertDate } from '@/utils/date'
import { api } from '@/api/api'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    MainHeader,
    CriptoSelector,
    PriceHolder,
    DateTimePicker,
    GraphView
  },
  setup() {
    let currentCripto = ref('bitcoin')
    let currentDateTime = ref()
    let currentCriptoPrice = ref(0)
    let currentCriptoHistory = ref([])

    async function updateCripto(pickedCripto) {
      currentCripto.value = pickedCripto
      currentCriptoPrice.value = await api.simple.current_price(pickedCripto)
      currentCriptoHistory.value = await api.coins.get_history(pickedCripto)
    }

    async function updateDateTime(pickedDateTime) {
      currentDateTime.value = pickedDateTime
      const date = new Date(pickedDateTime)
      const res = await api.coins.get_specific_time(currentCripto.value, date)
      if (res) currentCriptoPrice.value = res.price
    }

    updateCripto(currentCripto.value)

    return {
      convertDate,
      updateCripto,
      updateDateTime,
      currentCriptoPrice,
      currentCriptoHistory,
      currentCripto,
      currentDateTime,
    }
  }
}
</script> 