<template>
    <LinkElem :icon="loading ? 'bi bi-arrow-clockwise animate-spin' : icon" :text="text"
        class="button" :class="[
            ('button-' + variant),
            (loading ? 'animate-pulse' : '')
        ]" :disabled="disabled || loading" />
</template>

<script>

import LinkElem from './../LinkElem.vue';

export default {
    components: {
        LinkElem,
    },
    props: {
        variant: {
            type: String,
            default: 'primary'
        },
        text: {
            type: String,
            default: 'Button text'
        },
        icon: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style lang="css" scoped>
.button {
    @apply px-5 py-2 rounded disabled:bg-opacity-50 hover:bg-opacity-90 duration-150 hover:ease-in;
}

.button-primary {
    @apply bg-primary text-light-light;
}
</style>