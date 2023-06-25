<template>
    <LoadingElem :loading="loadingContent" loading-text="Carregando..." />
    <div v-if="!loadingContent" class="flex justify-center gap-4">

        <!-- subscriptions -->
        <div class="basis-full sm:basis-1/2 lg:basis-1/3">
            <CardElem :title="`${{
                undefined: 'Sem assinatura',
                canceled: 'Assinatura cancelada',
                pending: 'Aguardando pagamento',
                active: 'Assinatura ativa',
                ended: 'Assinatura vencida',
            }[activeSubscription?.status]}`" :titleClass="theTitleClass">
                <template v-slot:content>
                    <div class="text-sm" v-if="activeSubscription?.status == 'active'">
                        <p class="pb-2">
                            Você possui uma assinatura válida até {{ activeSubscription.ends_in }}
                        </p>
                        <DefaultButton @click="cancelSubscription" variant="danger" text="Cancelar assinatura" size="small"
                            :loading="cancelingSubscription" />
                    </div>
                    <p class="text-sm" v-else>...</p>
                </template>
                <template v-slot:footer>
                    <LinkElem icon="clock" text="Histórico de assinaturas" :to="{ name: 'app.subscriptions' }" />
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
import DefaultButton from '../../components/Button/DefaultButton.vue';

export default {
    components: { IconElem, LinkElem, CardElem, LoadingElem, DefaultButton },
    data() {
        return {
            loadingContent: true,
            activeSubscription: {
                status: 'active',
                ends_in: '09/12/2023'
            },
            cancelingSubscription: false
        };
    },
    created() {
        this.$store.commit('addPageData', {
            title: '',
            icon: '',
        });
    },
    mounted() {
        this.$axios.req({
            action: '/dash/subscriptions/show/active',
            method: 'get',
            success: (resp) => {
                this.activeSubscription = resp.data?.subscription
            },
            finally: () => {
                this.loadingContent = false;
            }
        });
    },
    methods: {
        cancelSubscription() {
            let id = this.activeSubscription.id;

            this.cancelingSubscription = true;
            this.$axios.req({
                action: '/dash/subscriptions/' + id + '/cancel',
                method: 'patch',
                success: (resp) => {
                    if (resp.data?.success) {
                        this.activeSubscription.status = resp.data?.subscription.status;
                    }
                },
                finally: () => {
                    this.cancelingSubscription = false;
                }
            });
        }
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