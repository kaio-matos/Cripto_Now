<template>
    <div class="fixed bottom-5 left-5 p-5 rounded drop-shadow-xl transition-opacity"
        :class="`${color} ${active ? 'opacity-100' : 'opacity-0'}`">
        <span class="text-white text-xl font-semibold">
            {{ message.message }}
        </span>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue'

export default {
    name: 'message-balloon',
    props: {
        message: {
            type: Object,
            default: () => ({
                type: 'error',
                message: '',
            })
        },
    },
    setup(props) {
        let color = ref('bg-red-500')
        let active = ref(false)

        watchEffect(() => {
            if (props.message.message) active.value = true;
            if (props.message.type === "error")
                color.value = "bg-red-500"
            else if (props.message.type === "success")
                color.value = "bg-green-500"


            setTimeout(() => { active.value = false }, 5000)
        })

        return { color, active }
    }
}
</script>
