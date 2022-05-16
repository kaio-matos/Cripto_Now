<template>
    <span class="text-8xl primary-font text-red-500">
        {{ currentPrice.toLocaleString(
                'pt-br',
                { style: 'currency', currency: 'BRL' }
            )
        }}
    </span>
</template>

<script>
export default {
    name: 'price-holder',
    props: {
        currentPrice: {
            type: Number,
            required: true
        }
    },
}
</script>
