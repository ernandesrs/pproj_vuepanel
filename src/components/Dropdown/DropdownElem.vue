<template>
    <div class="relative">
        <div @click="show = !show" class="flex items-center cursor-pointer py-3 z-50">
            <!-- profile photo -->
            <slot name="button" />
            <IconElem class="ml-2 text-xs" icon="bi bi-chevron-down" />
        </div>

        <Transition enter-from-class="opacity-0 -translate-y-5"
            enter-active-class="duration-300 ease-in-out"
            leave-to-class="opacity-0 -translate-y-5"
            leave-active-class="duration-200 ease-out">
            <div v-show="show"
                class="w-52 absolute right-0 top-auto bg-dark border border-dark-dark shadow-lg rounded-lg px-5 py-4 z-40">
                <slot name="content" />
            </div>
        </Transition>
    </div>
</template>

<script>

import IconElem from './../../components/IconElem.vue';

export default {
    components: { IconElem },
    data() {
        return {
            show: false
        }
    },
    watch: {
        show(nv) {
            if (nv) {
                this.monitorClickOut();
            } else {
                this.removeMonitorClickOut();
            }
        }
    },
    methods: {
        monitorClickOut() {
            document.addEventListener('click', this.monitorClickOutListener);
        },
        monitorClickOutListener(event) {
            if (!this.$el.contains(event.target)) {
                this.show = false;
            }
        },
        removeMonitorClickOut() {
            document.removeEventListener('click', this.monitorClickOutListener);
        }
    },
}

</script>

<style lang="css" scoped>

</style>