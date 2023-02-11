<template>
    <template v-if="alert.message">
        <div class="alert" :class="['alert-' + alert.type, 'alert-' + alert.variant]">
            {{ alert.message }}
        </div>
    </template>
</template>

<script>

export default {
    watch: {
        currentRoute(newRoute, oldRoute) {
            if (newRoute !== oldRoute && this.alert.message) {
                this.$store.commit("addMessage", {
                    message: null
                });
            }
        }
    },
    computed: {
        alert() {
            return this.$store.getters.getMessage;
        },
        currentRoute() {
            return this.$route.name;
        }
    }
}

</script>

<style lang="css" scoped>
.alert {
    @apply px-5 py-3 border shadow-sm text-sm text-center cursor-default;
}

.alert-fixed {
    @apply mb-5;
}

.alert-light {
    @apply bg-light-light text-gray-500;
}

.alert-success {
    @apply bg-emerald-100 border-emerald-200 text-emerald-500;
}

.alert-danger {
    @apply bg-red-100 border-red-200 text-red-500;
}

.alert-warning {
    @apply bg-orange-100 border-orange-200 text-orange-500;
}

.alert-info {
    @apply bg-cyan-50 border-cyan-200 text-cyan-500;
}
</style>