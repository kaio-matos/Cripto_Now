<template>
    <span class="text-4xl primary-font text-red-500
                 sm:text-7xl
                 md:text-7xl
                 lg:text-8xl">
        {{ currentPrice.toLocaleString(
                'pt-br',
                {
                    style: 'currency',
                    currency: 'BRL',
                    maximumFractionDigits: 5
                }
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
