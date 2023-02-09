<template>
    <span class="icon" :class="[iconClass]"></span>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: 'bi bi-app'
        },
    },

    computed: {
        iconClass() {
            return this.icon;
        }
    },
}
</script>

<style lang="css" scoped>
.icon {
    @apply inline-block pointer-events-none;
}
</style>