<template>
    <div class="wrap">
        <div class="wrap-box">
            <div class="box-header">
                <IconElem v-if="$store.state.page.icon" :icon="$store.state.page.icon" />
                <div class="title">
                    {{ $store.state.page.title }}
                </div>
                <div class="subtitle">
                    <p v-if="$route.name === 'auth.login'">
                        Ou
                        <LinkElem :to="{ name: 'auth.register' }" text="crie uma conta" />
                        agora mesmo.
                    </p>
                    <p v-if="$route.name === 'auth.register'">
                        Ou
                        <LinkElem :to="{ name: 'auth.login' }" text="acesse uma conta" />
                        existente.
                    </p>
                    <p v-if="$route.name === 'auth.forget'">
                        <LinkElem :to="{ name: 'auth.login' }" text="Fazer login" /> |
                        <LinkElem :to="{ name: 'auth.register' }" text="Criar conta" />
                    </p>
                    <p v-if="$route.name === 'auth.update-password'">
                        Informe e confirme sua nova senha
                    </p>
                </div>
            </div>
            <div class="box-body">
                <AlertElem type="floating" />
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script>

import AlertElem from '../components/AlertElem.vue';
import IconElem from '../components/IconElem.vue';
import LinkElem from '../components/LinkElem.vue';

export default {
    components: { IconElem, LinkElem, AlertElem },
    setup() {
        return {};
    }
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
    @apply w-full bg-white bg-opacity-5 py-6 px-6 shadow-xl rounded;

    @apply sm:max-w-[400px] md:max-w-[500px];
}

.wrap-box>.box-header {
    @apply flex flex-col justify-center items-center text-center;
}

.wrap-box>.box-header>.icon {
    @apply w-12 h-12 flex items-center justify-center bg-primary rounded-md text-light text-2xl mb-1;
}

.wrap-box>.box-header>.title {
    @apply text-3xl font-semibold text-gray-700;
}

.wrap-box>.box-header>.subtitle {
    @apply text-lg text-gray-500 font-normal;
}

.wrap-box>.box-body {
    @apply bg-transparent pt-5 pb-2 px-2;
}
</style>