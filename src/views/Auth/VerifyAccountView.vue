<template>
    <div v-if="requesting" class="animate-pulse text-center text-gray-600">
        <div class="text-3xl">
            <IconElem icon="bi bi-arrow-clockwise animate-spin" />
        </div>
        <h1 class="text-2xl font-semibold mb-2">
            Verificando sua conta...
        </h1>
    </div>

    <div v-if="fail" class="text-center text-red-600">
        <div class="text-3xl">
            <IconElem icon="bi bi-x-lg" />
        </div>
        <h1 class="text-2xl font-semibold mb-2">
            Falha na verificação.
        </h1>
        <p class="text-lg" v-html="failMessage">
        </p>
    </div>

    <div v-if="success" class="text-center text-emerald-600">
        <div class="text-3xl">
            <IconElem icon="bi bi-check-lg" />
        </div>
        <h1 class="text-2xl font-semibold mb-2">
            Sucesso!
        </h1>
        <p class="text-lg">
            Sua conta foi verificada com sucesso, agora você tem acesso completo a nossa
            aplicação.
        </p>
        <div class="pt-3">
            <DefaultButton icon="bi bi-pie-chart" text="Dashboard"
                :to="{ name: 'app.home' }" />
        </div>
    </div>

</template>

<script>

import messages from '../../services/messages';
import DefaultButton from '../../components/Button/DefaultButton.vue';
import IconElem from '../../components/IconElem.vue';

export default {
    components: { IconElem, DefaultButton },
    data() {
        return {
            requesting: true,
            fail: false,
            failMessage: null,
            success: false,
        }
    },
    mounted() {
        let token = this.$route.query?.token;
        if (!token) {
            this.requesting = false;
            this.fail = true;
            this.failMessage = 'Link de verificação sem token, acesse sua conta e solicite um link de verificação válido.';
            return;
        }

        this.$axios.request('/auth/verify-account/?token=' + token).then(() => {
            this.success = true;
        }).catch((resp) => {
            this.fail = true;
            this.failMessage = messages.get(resp.response?.data?.error);
        }).then(() => {
            this.requesting = false;
        });
    },
}

</script>
