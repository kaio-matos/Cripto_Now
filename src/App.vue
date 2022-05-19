<template>
  <div>
    <main-header />
    <div class="flex flex-col m-auto mt-[2rem] px-5
                lg:flex-row lg:px-10 lg:max-w-screen-xl lg:gap-5 lg:mt-[9rem]
                ">
      <!-- Pickers and price section -->
      <section class="flex flex-col flex-1 justify-between text-center items-center
                      lg:text-left lg:items-start">
        <div>
          <cripto-selector class="w-full mb-5" @update:cripto="updateCripto" />
          <date-time-picker class="w-full" @update:dateTime="updateDateTime"></date-time-picker>
        </div>

        <div class="mt-5">
          <p class="hidden lg:flex">
            {{ currentDateTime ?
                `Nearest price at ${convertDate(new Date(currentDateTime))}` :
                "Price now"
            }}</p>
          <price-holder :currentPrice="currentCriptoPrice" />
        </div>
      </section>

      <!-- Graphic visualization section -->
      <section class="flex-1 mt-5">
        <p class="hidden md:flex lg:flex">Price of 30 days ago</p>
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