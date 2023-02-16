<template>
    <div v-if="loadingContent" class="text-center animate-pulse">
        <IconElem icon="bi bi-arrow-clockwise animate-spin text-4xl" />
        <p class="text-lg">Aguarde...</p>
    </div>
    <div v-else class="flex justify-center gap-4">

        <!-- subscriptions -->
        <div class="basis-1/2 lg:basis-1/3">
            <CardElem :title="`${{
                undefined: 'Sem assinatura',
                canceled: 'Assinatura cancelada',
                pending: 'Aguardando pagamento',
                active: 'Assinatura ativa',
                ended: 'Assinatura vencida',
            }[activeSubscription?.status]}`" :titleClass="{
    'text-red-500': !activeSubscription || activeSubscription?.status == 'canceled',
    'text-sky-300': activeSubscription?.status == 'pending',
    'text-emerald-500': activeSubscription?.status == 'active',
    'text-yellow-300': activeSubscription?.status == 'ended',
}">
                <template v-slot:content>
                    <p class="text-sm" v-if="activeSubscription?.status == 'active'">Você
                        possui uma assinatura válida até {{ activeSubscription.ends_in }}
                    </p>
                    <p class="text-sm" v-else>...</p>
                </template>
                <template v-slot:footer>
                    <LinkElem icon="bi bi-clock" text="Histórico de assinaturas"
                        :to="{ name: 'app.subscriptions' }" />
                </template>
            </CardElem>
        </div>
        <!-- /subscriptions -->
        <!-- /cards -->

    </div>
</template>

<script>

import CardElem from '../../components/Card/CardElem.vue';
import IconElem from '../../components/IconElem.vue';
import LinkElem from '../../components/LinkElem.vue';

export default {
    components: { IconElem, LinkElem, CardElem },
    data() {
        return {
            loadingContent: true,
            activeSubscription: {
                status: 'active',
                ends_in: '09/12/2023'
            }
        };
    },
    mounted() {
        this.loadingContent = false;
    }
}
</script>

<style lang="css" scoped>

</style>