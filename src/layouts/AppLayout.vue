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
                <LinkElem class="flex flex-col items-center pb-3"
                    :to="{ name: 'app.home' }">
                    <span
                        class="text-light-dark text-3xl font-bold tracking-wider">LAPI</span>
                    <span
                        class="text-lg text-light-light font-medium tracking-widest">ADMIN</span>
                </LinkElem>

                <div class="bg-dark bg-opacity-25 rounded-lg px-4 py-4 h-full">
                    <NavGroup column class="h-full" :items="sidebar.navigation" />
                </div>
            </aside>
        </Transition>

        <main class="main">
            <section class="main-bar">
                <button @click="sidebarToggle" class="text-xl" type="button">
                    <IconElem icon="bi bi-list" />
                </button>

                <div class="flex items-center ml-auto">
                    <NavGroup class="mr-2" :items="[
                        {
                            text: 'Dashboard',
                            title: 'Assinaturas',
                            icon: 'bi bi-pie-chart',
                            to: { name: 'app.home' },
                            activeIn: ['app.home'],
                            target: '_self'
                        },
                        {
                            text: 'Assinaturas',
                            title: 'Assinaturas',
                            icon: 'bi bi-list',
                            to: { name: 'app.subscriptions' },
                            activeIn: ['app.subscriptions'],
                            target: '_self'
                        },
                    ]" />

                    <!-- profile -->
                    <DropdownElem>
                        <!-- photo photo -->
                        <template v-slot:button>
                            <div
                                class="border px-2 w-7 h-7 rounded-full flex items-center justify-center overflow-hidden">
                                E
                            </div>
                        </template>

                        <template v-slot:content>
                            <div>
                                <div class="flex flex-col items-center pt-2 text-center">
                                    <div
                                        class="border px-2 w-14 h-14 rounded-full flex items-center justify-center overflow-hidden">
                                        E
                                    </div>
                                    <p class="text-lg font-semibod pt-2">
                                        {{ $store.getters.getAuthUser.first_name }}
                                        {{ $store.getters.getAuthUser.last_name }}
                                    </p>
                                    <p class="text-sm font-light pb-2">
                                        {{ $store.getters.getAuthUser.email }}
                                    </p>
                                </div>

                                <div class="pb-2 flex justify-center text-base">
                                    <LinkElem text="Perfil" :to="{ name: 'app.profile' }"
                                        class="px-3 py-1" />
                                    <LinkElem @click="logout" text="Logout"
                                        :icon="`${logouting ? 'bi bi-arrow-clockwise animate-spin' : ''}`"
                                        class="px-3 py-1 text-red-400"
                                        :loading="logouting" />
                                </div>
                            </div>
                        </template>
                    </DropdownElem>
                </div>
            </section>

            <div class="main-content">
                <AlertElem type="floating" />
                <RouterView />
            </div>
        </main>
    </div>

</template>

<script>

import token from '../services/token';
import IconElem from '../components/IconElem.vue';
import LinkElem from '../components/LinkElem.vue';
import DropdownElem from '../components/Dropdown/DropdownElem.vue';
import AlertElem from '../components/AlertElem.vue';
import NavGroup from '../components/Nav/NavGroup.vue';

const MOBILE_WIDTH = 768;

export default {
    components: { IconElem, LinkElem, DropdownElem, AlertElem, NavGroup },
    data() {
        return {
            sidebar: {
                show: false,
                mobile: true,
                navigation: [
                    {
                        text: 'Dashboard',
                        title: 'Dashboard',
                        icon: 'bi bi-pie-chart',
                        to: { name: 'app.home' },
                        target: '_self',
                        activeIn: ['app.home']
                    },
                    {
                        text: 'Assinaturas',
                        title: 'Assinaturas',
                        icon: 'bi bi-list',
                        to: { name: 'app.subscriptions' },
                        target: '_self',
                        activeIn: ['app.subscriptions']
                    },
                    {
                        text: 'Perfil',
                        title: 'Perfil',
                        icon: 'bi bi-person',
                        to: { name: 'app.profile' },
                        target: '_self',
                        activeIn: ['app.profile'],
                        li_class: 'mt-auto'
                    },
                    {
                        text: 'Sair',
                        title: 'Sair',
                        icon: 'bi bi-box-arrow-left',
                        target: '_self',
                        a_class: 'text-red-500',
                        clickEvent: this.logout
                    }
                ]
            },
            logouting: false
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
        },
        logout() {
            if (this.logouting) {
                return;
            }

            this.logouting = true;
            this.$axios.request('/auth/logout', {}, 'get').then(() => {
                token.remove();
                this.$router.push({
                    name: 'auth.login'
                });
            }).catch(() => {
                // 
            }).then(() => {
                this.logouting = false;
            });
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
    @apply mb-3 flex items-center;
}

.main-content {
    @apply px-8 py-6 bg-dark-light rounded-md flex-1;
}
</style>