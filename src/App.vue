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

    <message-balloon :message="error" />
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
import CriptoSelector from '@/components/CriptoSelector.vue'
import PriceHolder from '@/components/PriceHolder.vue'
import DateTimePicker from '@/components/DateTimePicker.vue'
import MessageBalloon from '@/components/MessageBalloon.vue'
import GraphView from '@/components/GraphView'
import { convertDate } from '@/utils/date'
import { api } from '@/api/api'
import { reactive, ref } from 'vue'

export default {
  name: 'App',
  components: {
    MainHeader,
    CriptoSelector,
    PriceHolder,
    DateTimePicker,
    GraphView,
    MessageBalloon
  },
  setup() {
    let currentCripto = ref('bitcoin')
    let currentDateTime = ref()
    let currentCriptoPrice = ref(0)
    let currentCriptoHistory = ref([])
    let error = reactive({ message: '', type: 'error' });

    async function updateCripto(pickedCripto) {
      currentCripto.value = pickedCripto
      if (currentDateTime.value) return updateDateTime(currentDateTime.value)

      try {
        currentCriptoPrice.value = await api.simple.current_price(pickedCripto)
        currentCriptoHistory.value = await api.coins.get_history(pickedCripto)
      } catch (err) {
        error.message = err.message
        console.error(err)
      }
    }

    function updateCurrentCriptoNow() {
      currentDateTime.value = undefined
      updateCripto(currentCripto.value)
    }

    async function updateDateTime(pickedDateTime) {
      if (!pickedDateTime) {
        updateCurrentCriptoNow()
        return api.startInterval(updateCurrentCriptoNow)
      }
      api.endInterval()
      currentDateTime.value = pickedDateTime
      const date = new Date(pickedDateTime)

      try {
        const res = await api.coins.get_specific_time(currentCripto.value, date)
        if (res) currentCriptoPrice.value = res.price
      } catch (err) {
        error.message = err.message
        console.error(err)
      }
    }

    updateCripto(currentCripto.value)
    api.startInterval(updateCurrentCriptoNow)

    return {
      convertDate,
      updateCripto,
      updateCurrentCriptoNow,
      updateDateTime,
      currentCriptoPrice,
      currentCriptoHistory,
      currentCripto,
      currentDateTime,
      error
    }
  }
}
</script> 