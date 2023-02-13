<template>
    <Transition name="animation" @after-enter="onAfterEnter">
        <div v-if="alert.message" class="alert"
            :class="['alert-' + type, 'alert-' + alert.variant]">
            <div class="alert-body">
                <p class="alert-content">
                    {{ alert.message }}
                </p>
                <div @click="close" class="alert-close">
                    <IconElem icon="bi bi-x-lg" />
                </div>
            </div>
        </div>
    </Transition>
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
    data() {
        return {
            timerHandler: null,
            alert: {}
        }
    },
    watch: {
        currentRoute(newRoute, oldRoute) {
            if (newRoute !== oldRoute) {
                if (this.alert.message) {
                    this.clear();
                }

                this.$alerts.flash();
            }
        },
        alertFromStore: {
            deep: true,
            handler(nv, ov) {
                if (!this.alert.time) {
                    this.alert = nv;
                } else {
                    if (this.alert.message) {
                        this.alert.message = null;
                        setTimeout(() => {
                            this.alert = nv;
                        }, 500);
                    } else {
                        this.alert = nv;
                    }
                }
            }
        }
    },
    computed: {
        alertFromStore() {
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
            this.alert.message = null;
        },
        onAfterEnter() {
            if (this.type !== 'fixed') {
                this.$el.classList.add('bounce');
                setTimeout(() => {
                    this.$el.classList.remove('bounce');
                }, 1000);
            }
        }
    },
}

</script>

<style lang="css" scoped>
.animation-enter-active {
    @apply duration-200 ease-in;
}

.animation-leave-active {
    @apply duration-500 ease-out;
}

.animation-enter-from,
.animation-leave-to {
    @apply opacity-0 -translate-y-2 scale-95;
}

.bounce {
    animation: bounceAnimation .25s 1 ease-in-out;
}

@keyframes bounceAnimation {

    20%,
    60% {
        transform: translateY(-6%);
    }

    40%,
    80% {
        transform: translateY(12%);
    }

    90%,
    95%,
    100%,
    5% {
        transform: translateY(-12%);
    }
}

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