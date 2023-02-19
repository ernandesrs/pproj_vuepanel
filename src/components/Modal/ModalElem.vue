<template>
    <div v-if="showModal"
        class="bg-black bg-opacity-25 fixed top-0 left-0 w-full min-h-screen z-50"></div>

    <Transition @beforeEnter="openModal" @afterEnter="openedModal" @beforeLeave="closeModal"
        @afterLeave="closedModal" enter-from-class="opacity-0 scale-90"
        enter-active-class="duration-300 ease-in-out"
        leave-to-class="opacity-0 -translate-y-10" leave-active-class="duration-100 ease-in">
        <div v-if="showModal" class="modal-wrap" :class="{
            'items-center': size !== 'full' && position !== 'top',
            'items-start': position === 'top' || size === 'full'
        }">

            <div ref="modal" class="modal" :class="{
                'sm:max-w-sm': size === 'normal',
                'sm:max-w-xs': size === 'small',
                'sm:max-w-2xl': size === 'large',
                'modal-full': size === 'full',
            }">
                <div class="modal-header">
                    <h2 v-if="title"
                        class="text-xl md:text-2xl font-semibold modal-header-title"
                        v-html="title"></h2>

                    <div @click="closeModal"
                        class="text-lg md:text-xl ml-auto cursor-pointer">
                        <IconElem icon="xLg" />
                    </div>
                </div>
                <div class="modal-content">
                    <slot />
                </div>
            </div>

        </div>
    </Transition>
</template>

<script>

import IconElem from '../IconElem.vue';

export default {
    components: { IconElem },
    emits: { 'update:show': null, open: null, opened: null, close: null, closed: null },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: "normal"
        },
        position: {
            type: String,
            default: "center"
        },
        title: {
            type: String,
            default: null
        },
        hideOnClickOut: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showModal: this.show
        }
    },
    watch: {
        show(newValue) {
            this.showModal = newValue;
        }
    },
    methods: {
        openModal() {
            this.$emit('open');
        },
        openedModal() {
            this.$emit('opened');
            if (this.hideOnClickOut) {
                this.addClickOutMonitor();
            }
        },
        closeModal() {
            this.showModal = false;
            this.$emit('close');
        },
        closedModal() {
            this.$emit('closed');
            this.$emit('update:show');

            if (this.hideOnClickOut) {
                this.removeClickOutMonitor();
            }
        },

        // click out
        addClickOutMonitor() {
            document.addEventListener('click', this.clickOutListener);
        },
        removeClickOutMonitor() {
            document.removeEventListener('click', this.clickOutListener);
        },
        clickOutListener(event) {
            if (this.$refs.modal && this.$refs.modal.contains(event.target)) {
                return;
            }

            this.closeModal();
        }
    },
}

</script>

<style lang="css" scoped>
.modal-wrap {
    @apply fixed top-0 left-0 w-full min-h-screen z-50 flex justify-center p-3;
}

.modal {
    @apply border border-dark w-full bg-dark-light rounded overflow-hidden shadow-lg;
    max-height: calc(100vh - 24px);
}

.modal-full {
    height: calc(100vh - 24px);
}

.modal-header,
.modal-content {
    @apply px-6 py-4 overflow-y-auto;
}

.modal-header {
    @apply bg-transparent flex items-center;
}

.modal-content {
    @apply py-4 overflow-y-auto h-full;
    max-height: calc(100vh - (64px + 24px));
}
</style>