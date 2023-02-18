<template>
    <LinkElem :icon="loading ? 'loading' : icon" :text="text"
        class="button" :class="[
            (outlined ? 'button-outlined-' + variant : 'button-' + variant),
            ('button-' + size),
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
        },
        size: {
            type: String,
            default: 'normal'
        },
        outlined: {
            type: Boolean,
            default: false
        }
    },
}

</script>

<style lang="css" scoped>
.button {
    @apply border rounded disabled:bg-opacity-50 hover:bg-opacity-80 duration-150 hover:ease-in shadow-md;
}

.button-normal {
    @apply px-5 py-2;
}

.button-small {
    @apply px-3 py-2 text-xs;
}

.button-large {
    @apply px-5 py-2 text-lg;
}

.button-primary {
    @apply border-primary bg-primary text-light-light;
}

.button-outlined-primary {
    @apply border-primary text-primary hover:bg-primary hover:text-light-light;
}

.button-secondary {
    @apply border-secondary bg-secondary text-light-light;
}

.button-outlined-secondary {
    @apply border-secondary text-secondary hover:bg-secondary hover:text-light-light;
}

.button-light {
    @apply border-light bg-light text-dark-light;
}

.button-outlined-light {
    @apply border-light text-dark-light hover:bg-light hover:text-dark-light;
}

.button-dark {
    @apply border-dark bg-dark text-light;
}

.button-outlined-dark {
    @apply border-dark text-dark hover:bg-dark hover:text-light-light;
}

.button-success {
    @apply border-emerald-500 bg-emerald-500 text-light;
}

.button-outlined-success {
    @apply border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-light-light;
}

.button-danger {
    @apply border-red-500 bg-red-400 text-light;
}

.button-outlined-danger {
    @apply border-red-500 text-red-500 hover:bg-red-500 hover:text-light-light;
}

.button-warning {
    @apply border-orange-500 bg-orange-400 text-light;
}

.button-outlined-warning {
    @apply border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-light-light;
}
</style>