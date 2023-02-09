<template>
    <div class="wrap">
        <div class="wrap-box">
            <div class="box-header">
                <IconElem :icon="$store.state.page.icon" />
                <div class="title">
                    {{ $store.state.page.title }}
                </div>
                <div class="subtitle">
                    <p v-if="$route.name === 'auth.login'">
                        Ou
                        <RouterLink :to="{
                            name: 'auth.register'
                        }">crie uma conta</RouterLink> agora mesmo.
                    </p>
                    <p v-if="$route.name === 'auth.register'">
                        Ou
                        <RouterLink :to="{
                            name: 'auth.login'
                        }">acesse uma conta existente</RouterLink>.
                    </p>
                    <p v-if="$route.name === 'auth.forget'">
                        <RouterLink :to="{
                            name: 'auth.login'
                        }">Fazer login</RouterLink> |
                        <RouterLink :to="{
                            name: 'auth.login'
                        }">Criar conta</RouterLink>
                    </p>
                    <p v-if="$route.name === 'auth.update-password'">
                        Informe e confirme sua nova senha
                    </p>
                </div>
            </div>
            <RouterView />
        </div>
    </div>
</template>

<script>

import IconElem from '../components/IconElem.vue';

export default {
    setup() {
        return {};
    },
    components: { IconElem }
}
</script>

<style lang="css" scoped>
body {
    @apply text-dark;
}

a {
    @apply text-primary;
}

.wrap {
    @apply w-full min-h-screen bg-light-light flex items-center justify-center px-5;
}

.wrap-box {
    @apply w-full bg-white bg-opacity-5 py-5 px-6 shadow-xl rounded;

    @apply sm:max-w-[400px];
}

.wrap-box>.box-header {
    @apply flex flex-col justify-center items-center text-center mb-4;
}

.wrap-box>.box-header>.icon {
    @apply w-12 h-12 flex items-center justify-center bg-primary rounded-md text-light text-2xl mb-3;
}

.wrap-box>.box-header>.title {
    @apply text-3xl font-semibold text-gray-700;
}

.wrap-box>.box-header>.subtitle {
    @apply text-lg text-gray-500 font-normal;
}
</style>