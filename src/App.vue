<template>
  <div class="transition-in">
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
            {{ currentCripto.dateTime ?
                `Nearest price at ${convertDate(new Date(currentCripto.dateTime))}` :
                "Price now"
            }}</p>
          <main-loading v-if="loading" />
          <price-holder v-else :currentPrice="currentCripto.price" />
        </div>
      </section>

      <!-- Graphic visualization section -->
      <section class="flex-1 mt-5">
        <p class="hidden md:flex lg:flex">Price of 30 days ago</p>
        <graph-view :history="currentCripto.history" />
      </section>
    </div>

    <message-balloon :message="error" />
    <p class="text-center mt-5">
      All the data comes from the
      <a class="text-blue-500" href="https://www.coingecko.com">
        CoinGecko API
      </a>
    </p>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
import CriptoSelector from '@/components/CriptoSelector.vue'
import PriceHolder from '@/components/PriceHolder.vue'
import DateTimePicker from '@/components/DateTimePicker.vue'
import MessageBalloon from '@/components/MessageBalloon.vue'
import GraphView from '@/components/GraphView'
import MainLoading from '@/components/MainLoading'
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
    MessageBalloon,
    MainLoading
  },
  setup() {
    const currentCripto = reactive({
      cripto: 'bitcoin',
      dateTime: undefined,
      price: 0,
      history: [],
    })
    const error = reactive({ message: '', type: 'error' });
    const loading = ref(false)

    /**
     * Update currentPrice based on date and stops requestNewestPrice.
     * 
     * Case pickedDateTime does not exist,
     * update cripto to it's current price and requestNewestPrice.
     * 
     * @param {String} pickedDateTime 
     */
    async function updateDateTime(pickedDateTime) {
      if (!pickedDateTime) {
        currentCripto.dateTime = undefined
        return requestNewestPrice()
      }
      api.endInterval()
      currentCripto.dateTime = pickedDateTime
      const date = new Date(pickedDateTime)

      try {
        loading.value = true
        const res = await api.coins.get_specific_time(currentCripto.cripto, date)
        if (res) currentCripto.price = res.price
      } catch (err) {
        error.message = err.message
        console.error(err)
      }
      loading.value = false
    }

    /**
     * Updates with criptoId.
     * 
     * Case some date is selected calls updateDateTime and returns. 
     * @param {String} pickedCripto 
     */
    async function updateCripto(pickedCripto) {
      currentCripto.cripto = pickedCripto
      if (currentCripto.dateTime) {
        currentCripto.history = await api.coins.get_history(pickedCripto)
        return updateDateTime(currentCripto.dateTime)
      }
      try {
        loading.value = true
        currentCripto.price = await api.simple.current_price(pickedCripto)
        currentCripto.history = await api.coins.get_history(pickedCripto)
      } catch (err) {
        error.message = err.message
        console.error(err)
      }
      loading.value = false
    }

    function requestNewestPrice() {
      updateCripto(currentCripto.cripto)
      api.startInterval(() => updateCripto(currentCripto.cripto))
    }

    requestNewestPrice()

    return {
      convertDate,
      updateCripto,
      updateDateTime,
      currentCripto,
      error,
      loading
    }
  }
}
</script> 