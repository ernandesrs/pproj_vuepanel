<template>
    <LinkElem :icon="loading ? 'bi bi-arrow-clockwise animate-spin' : icon" :text="text"
        class="button" :class="[
            ('button-' + variant),
            (loading ? 'animate-pulse' : '')
        ]" :disabled="disabled || loading" :type="type" />
</template>

<script>

import LinkElem from './../LinkElem.vue';

export default {
    components: {
        LinkElem,
    },
    props: {
        type: {
            type: String,
            default: 'submit'
        },
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
    @apply px-5 py-2 rounded disabled:bg-opacity-50 hover:bg-opacity-80 duration-150 hover:ease-in shadow-md;
}

.button-primary {
    @apply bg-primary text-light-light;
}

.button-secondary {
    @apply bg-secondary text-light-light;
}

.button-light {
    @apply bg-light text-dark-light;
}

.button-dark {
    @apply bg-dark text-light;
}

.button-success {
    @apply bg-emerald-500 text-light;
}

.button-danger {
    @apply bg-red-400 text-light;
}

.button-warning {
    @apply bg-orange-400 text-light;
}
</style>