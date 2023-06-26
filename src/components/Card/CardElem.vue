<template>
    <div class="border border-dark border-opacity-25 rounded-lg px-4 py-2">
        <h3 v-if="title && !$slots.header" class="text-lg font-semibold"
            :class="titleClass" v-html="title">
        </h3>
        <div v-else class="pt-2">
            <slot name="header" />
        </div>
        <div class="py-3">
            <slot name="content" />
        </div>
        <div v-if="$slots.footer" class="border-t border-dark border-opacity-25"></div>
        <div v-if="$slots.footer" class="py-2">
            <slot name="footer" />
        </div>
    </div>
</template>

<script>

export default {
    props: {
        title: {
            type: String,
            default: null
        },
        titleClass: {
            type: String,
            default: null
        }
    },
}

</script>