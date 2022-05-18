<template>
  <select v-bind="$attrs" @change="changeCripto"
    class="p-4 text-2xl text-neutral-600 cursor-pointer rounded border border-neutral-200">
    <option value="" disabled selected>Choose a criptocurrency</option>
    <option selected value="bitcoin">Bitcoin</option>
    <option value="dacxi">DACXI</option>
    <option value="ethereum">ETH</option>
    <option value="cosmos">ATOM</option>
    <option value="terra-luna">LUNA</option>
  </select>
</template>

<script>
export default {
  name: 'cripto-selector',
  setup(_, { emit }) {
    function changeCripto(value) {
      emit('update:cripto', value.target.value)
    }

    return { changeCripto };
  },
}
</script>
