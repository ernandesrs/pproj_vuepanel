<template>
    <div v-if="loading" class="text-center animate-pulse">
        <IconElem icon="loading" class="text-4xl" />
        <p class="text-lg" v-html="loadingText"></p>
    </div>
</template>

<script>

import IconElem from './IconElem.vue';

export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        loadingText: {
            type: String,
            default: "Aguarde..."
        },
    },
    components: { IconElem }
}

</script>
