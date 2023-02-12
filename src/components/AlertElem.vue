<template>
    <template v-if="alert.message">
        <div class="alert" :class="['alert-' + type, 'alert-' + alert.variant]">
            <div class="alert-body">
                <p class="alert-content">
                    {{ alert.message }}
                </p>
                <div @click="close" class="alert-close">
                    <IconElem icon="bi bi-x-lg" />
                </div>
            </div>
        </div>
    </template>
</template>

<script>

import IconElem from './IconElem.vue';

export default {
    components: { IconElem },
    props: {
        type: {
            type: String,
            default: 'fixed'
        },
    },
    watch: {
        currentRoute(newRoute, oldRoute) {
            if (newRoute !== oldRoute && this.alert.message) {
                this.clear();
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
    },
    methods: {
        close() {
            this.clear();
        },
        clear() {
            this.$store.commit("addMessage", {
                message: null
            });
        }
    },
}

</script>

<style lang="css" scoped>
.alert {
    @apply flex flex-col px-5 py-3 border shadow-sm text-sm text-left cursor-default relative;
}

.alert-fixed {
    @apply mb-5;
}

.alert-floating {
    @apply fixed top-6 right-5 z-50 shadow-md max-w-xs;
    width: calc(100% - 2.25rem);
}

.alert-body {
    @apply flex items-center;
}

.alert-body>.alert-content {
    @apply w-full;
}

.alert-body>.alert-close {
    @apply cursor-pointer;
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