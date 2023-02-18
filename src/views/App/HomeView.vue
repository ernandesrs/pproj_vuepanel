<template>
    <LoadingElem :loading="loadingContent" loading-text="Carregando..." />
    <div v-if="!loadingContent" class="flex justify-center gap-4">

        <!-- subscriptions -->
        <div class="basis-1/2 lg:basis-1/3">
            <CardElem :title="`${{
                undefined: 'Sem assinatura',
                canceled: 'Assinatura cancelada',
                pending: 'Aguardando pagamento',
                active: 'Assinatura ativa',
                ended: 'Assinatura vencida',
            }[activeSubscription?.status]}`" :titleClass="theTitleClass">
                <template v-slot:content>
                    <p class="text-sm" v-if="activeSubscription?.status == 'active'">Você
                        possui uma assinatura válida até {{ activeSubscription.ends_in }}
                    </p>
                    <p class="text-sm" v-else>...</p>
                </template>
                <template v-slot:footer>
                    <LinkElem icon="clock" text="Histórico de assinaturas"
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
import LoadingElem from '../../components/LoadingElem.vue';

export default {
    components: { IconElem, LinkElem, CardElem, LoadingElem },
    data() {
        return {
            loadingContent: true,
            activeSubscription: {
                status: 'active',
                ends_in: '09/12/2023'
            }
        };
    },
    created() {
        this.$store.commit('addPageData', {
            title: '',
            icon: '',
        });
    },
    mounted() {
        this.loadingContent = false;
    },
    computed: {
        theTitleClass() {
            if (!this.activeSubscription) {
                return 'text-red-500';
            }

            let style = '';
            switch (this.activeSubscription.status) {
                case 'canceled':
                    style = 'text-red-500'
                    break;
                case 'pending':
                    style = 'text-sky-300'
                    break;
                case 'active':
                    style = 'text-emerald-500'
                    break;
                case 'ended':
                    style = 'text-yellow-300'
                    break;
            }

            return style;
        }
    },
}
</script>

<style lang="css" scoped></style>