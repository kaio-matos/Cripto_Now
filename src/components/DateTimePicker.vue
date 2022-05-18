<template>
    <div v-bind="$attrs">
        <vue-ctk-date-time-picker :max-date="new Date().toISOString()" label="Select specific date & time"
            v-model="dateRef" no-button-now locale="en">
        </vue-ctk-date-time-picker>
    </div>
</template>

<script>

import { ref, watchEffect } from 'vue';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

export default {
    name: 'date-time-picker',
    components: { VueCtkDateTimePicker },
    setup(_, { emit }) {
        const dateRef = ref()
        watchEffect(() => emit('update:dateTime', dateRef.value))

        return { dateRef }
    }
}
</script>

<style scoped>
:deep(.header-picker) {
    background-color: rgb(251 191 36) !important;
    color: rgb(64 64 64) !important;
}

/* Override default active effect */
:deep(.time-picker-column-item.active .time-picker-column-item-effect),
:deep(.datepicker-container .datepicker-days .datepicker-day.selected .datepicker-day-effect) {
    background-color: #ff4c29 !important;
}

/* Override default hover effect */
:deep(.datepicker-day:hover .datepicker-day-effect),
:deep(.time-picker-column-item:hover .time-picker-column-item-effect),
:deep(.custom-button:hover .custom-button-effect) {
    background-color: #ff4c29 !important;
}
</style>