<template>
    <Component :is="tag" :to="to" :href="url" :title="title" :target="target"
        class="inline-flex flex-wrap items-center justify-center">
        <IconElem v-if="icon && !iconEnd" :icon="icon" />
        <span class="inline-block" :class="[icon ? (iconEnd ? 'mr-2' : 'ml-2') : '']">
            {{ text }}
        </span>
        <IconElem v-if="icon && iconEnd" :icon="icon" />
    </Component>
</template>

<script>

import IconElem from './IconElem.vue';

export default {
    components: { IconElem },
    props: {
        url: {
            type: String,
            default: null
        },
        to: {
            type: Object,
            default: null
        },
        target: {
            type: String,
            default: "_self"
        },
        icon: {
            type: String,
            default: null,
        },
        iconEnd: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: null
        },
        text: {
            type: String,
            default: null
        }
    },
    computed: {
        tag() {
            return this.to ? 'RouterLink' : this.url ? 'a' : 'button';
        }
    },
}

</script>

<style lang="css" scoped>
span {
    @apply pointer-events-none;
}
</style>