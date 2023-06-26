<template>
    <div class="wrap">
        <!-- mobile sidebar backdrop -->

        <Transition enter-from-class="opacity-0" enter-active-class="duration-300 ease-in-out" leave-to-class="opacity-0"
            leave-active-class="duration-100 ease-out">
            <div @click="sidebarToggle" v-if="sidebar.mobile && sidebar.show"
                class="w-full h-screen z-40 bg-dark-dark bg-opacity-25 fixed top-0 left-0">
            </div>
        </Transition>

        <Transition enter-from-class="-translate-x-full" enter-active-class="duration-300 ease-in-out"
            leave-to-class="-translate-x-full" leave-active-class="duration-100 ease-out">
            <aside ref="sidebar" v-show="sidebar.show" class="sidebar" :class="{ 'sidebar-mobile': sidebar.mobile }">

                <!-- header -->
                <LinkElem class="flex flex-col items-center pb-3" :to="{ name: 'app.home' }">
                    <span class="pointer-events-none text-light-dark text-3xl font-bold tracking-wider">LAPI</span>
                    <span class="pointer-events-none text-lg text-light-light font-medium tracking-widest">ADMIN</span>
                </LinkElem>

                <div class="bg-dark bg-opacity-25 rounded-lg px-4 py-4 h-full">
                    <NavGroup column class="h-full" :items="sidebar.navigation" />
                </div>
            </aside>
        </Transition>

        <main class="main">
            <section class="main-bar">
                <button @click="sidebarToggle" class="text-xl" type="button">
                    <IconElem icon="list" />
                </button>

                <div class="flex items-center ml-auto">
                    <!-- profile -->
                    <DropdownElem>
                        <!-- photo photo -->
                        <template v-slot:button>
                            <div class="border px-2 w-7 h-7 rounded-full flex items-center justify-center overflow-hidden">
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
                                    <LinkElem text="Perfil" :to="{ name: 'app.profile' }" class="px-3 py-1" />
                                    <LinkElem @click="logout" text="Logout" :icon="`${logouting ? 'loading' : ''}`"
                                        class="px-3 py-1 text-red-400" :loading="logouting" />
                                </div>
                            </div>
                        </template>
                    </DropdownElem>
                </div>
            </section>

            <div class="main-header">
                <h1 class="text-xl md:text-2xl flex items-center">
                    <IconElem :icon="$store.getters.getPageIcon ?? 'app'" /><span class="block ml-2">{{
                        $store.getters.getPageTitle }}</span>
                </h1>
            </div>

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
                        icon: 'pieChart',
                        to: { name: 'app.home' },
                        target: '_self',
                        activeIn: ['app.home']
                    },
                    {
                        text: 'Assinaturas',
                        title: 'Assinaturas',
                        icon: 'list',
                        to: { name: 'app.subscriptions' },
                        target: '_self',
                        activeIn: ['app.subscriptions', 'app.subscriptions.new']
                    },
                    {
                        text: 'Cartões',
                        title: 'Cartões de credito',
                        icon: 'creditCard',
                        to: { name: 'app.credit-cards' },
                        target: '_self',
                        activeIn: ['app.credit-cards']
                    },
                    {
                        text: 'Perfil',
                        title: 'Perfil',
                        icon: 'user',
                        to: { name: 'app.profile' },
                        target: '_self',
                        activeIn: ['app.profile'],
                        li_class: 'mt-auto'
                    },
                    {
                        text: 'Sair',
                        title: 'Sair',
                        icon: 'logout',
                        target: '_self',
                        a_class: 'text-red-500',
                        clickEvent: this.logout
                    }
                ]
            },
            logouting: false
        }
    },
    watch: {
        sidebar: {
            deep: true,
            handler(nv, ov) {
                if (nv.show) {
                    // add monitor sidebar link click
                    document.addEventListener('click', this.sidebarClickLinkMonitor);
                } else {
                    // remove monitor sidebar link click
                    document.removeEventListener('click', this.sidebarClickLinkMonitor);
                }
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
        },
        logout() {
            if (this.logouting) {
                return;
            }

            this.logouting = true;
            this.$axios.req({
                action: '/auth/logout',
                method: 'get',
                success: () => {
                    token.remove();
                    this.$router.push({
                        name: 'auth.login'
                    });
                },
                finally: () => {
                    this.logouting = false;
                }
            });
        },
        sidebarClickLinkMonitor(event) {
            if (this.$refs?.sidebar && this.sidebar.mobile) {
                if (this.$refs.sidebar.contains(event.target)) {
                    if (['a', 'button'].includes(event.target.localName)) {
                        this.sidebarToggle();
                    }
                }
            }
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

.main-header {
    @apply pb-6;
}

.main-content {
    @apply px-8 py-6 bg-dark-light rounded-md flex-1;
}
</style>