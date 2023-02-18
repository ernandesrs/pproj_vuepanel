<template>
    <span class="icon" :class="[iconClass]"></span>
</template>

<script>

import icons from '../services/icons';

export default {
    props: {
        icon: {
            type: String,
            default: 'app'
        },
    },

    computed: {
        iconClass() {
            return icons.get(this.icon);
        }
    },
}
</script>

<style lang="css" scoped>
.icon {
    @apply inline-block pointer-events-none;
}
</style>