<template>

    <div class="wrap">
        <!-- mobile sidebar backdrop -->

        <Transition enter-from-class="opacity-0"
            enter-active-class="duration-300 ease-in-out" leave-to-class="opacity-0"
            leave-active-class="duration-100 ease-out">
            <div @click="sidebarToggle" v-if="sidebar.mobile && sidebar.show"
                class="w-full h-screen z-40 bg-dark-dark bg-opacity-25 fixed top-0 left-0">
            </div>
        </Transition>

        <Transition enter-from-class="-translate-x-full"
            enter-active-class="duration-300 ease-in-out"
            leave-to-class="-translate-x-full" leave-active-class="duration-100 ease-out">
            <aside v-show="sidebar.show" class="sidebar"
                :class="{ 'sidebar-mobile': sidebar.mobile }">

                <!-- header -->
                <LinkElem class="flex flex-col items-center" :to="{ name: 'app.home' }">
                    <span
                        class="text-light-dark text-3xl font-bold tracking-wider">LAPI</span>
                    <span
                        class="text-lg text-light-light font-medium tracking-widest">ADMIN</span>
                </LinkElem>

            </aside>
        </Transition>

        <main class="main">
            <section class="main-bar">
                <button @click="sidebarToggle" class="text-xl" type="button">
                    <IconElem icon="bi bi-list" />
                </button>

                <div class="ml-auto">

                    <!-- profile -->
                    <div class="flex items-center cursor-pointer">
                        <!-- profile photo -->
                        <div
                            class="border px-2 w-7 h-7 rounded-full flex items-center justify-center overflow-hidden">
                            E
                        </div>
                        <IconElem class="ml-2 text-xs" icon="bi bi-chevron-down" />
                    </div>
                </div>
            </section>

            <div class="main-content">
                <RouterView />
            </div>
        </main>
    </div>

</template>

<script>

import IconElem from '../components/IconElem.vue';
import LinkElem from '../components/LinkElem.vue';

const MOBILE_WIDTH = 768;

export default {
    components: { IconElem, LinkElem },
    data() {
        return {
            sidebar: {
                show: false,
                mobile: true
            }
        }
    },
    created() {
        if (window.innerWidth >= MOBILE_WIDTH) {
            this.sidebar.show = true;
            this.sidebar.mobile = false;
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth <= MOBILE_WIDTH) {
                if (this.sidebar.show) {
                    this.sidebar.show = false;
                    this.sidebar.mobile = true;
                }
            } else {
                if (!this.sidebar.show) {
                    this.sidebar.show = true;
                    this.sidebar.mobile = false;
                }
            }
        });
    },
    methods: {
        sidebarToggle() {
            this.sidebar.show = !this.sidebar.show;
        }
    },
}
</script>

<style lang="css" scoped>
.wrap {
    @apply bg-dark text-light flex;
}

.sidebar,
.main {
    @apply px-4 py-3 h-screen flex flex-col;
}

.sidebar {
    @apply w-full max-w-[225px] bg-dark-dark;
}

.sidebar.sidebar-mobile {
    @apply fixed z-50;
}

.main {
    @apply overflow-y-auto w-full;
}

.main-bar {
    @apply mb-3 flex items-center py-2;
}

.main-content {
    @apply px-4 py-3 bg-dark-light rounded-md flex-1;
}
</style>