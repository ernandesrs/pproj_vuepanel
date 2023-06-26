<template>
    <LoadingElem :loading="loadingContent" loading-text="Carregando..." />

    <div v-if="!loadingContent">
        <ListGroupElem :items="subscriptions" :list-actions="{
            show: true,
            buttons: {
                create: {
                    method: 'get',
                    to: hasActiveSubscription ? null : {
                        name: 'app.subscriptions.new'
                    },
                    text: 'Assinar'
                }
            }
        }">
            <template #listItemContent="{ item }">
                <div class="py-2 flex gap-2 subscription" :class="['subscription-' + item.status]">
                    <div class="basis-3/4">
                        <span class="px-2 text-xs status rounded-md">
                            Status: {{ item.status }}
                        </span>
                    </div>
                    <div class="basis-full">
                        #ID{{ item.id }}
                    </div>
                </div>
                <div class="text-sm text-light">
                    <p>
                        Assinatura: <span class="text-light-dark">{{ item.created_at }}</span>
                    </p>
                    <p>
                        Período: <span class="text-light-dark">{{ item.starts_in }}</span> à
                        <span class="text-light-dark">{{ item.ends_in }}</span>
                    </p>
                </div>
            </template>
        </ListGroupElem>
    </div>
</template>

<script>

import ListGroupElem from '../../components/List/ListGroupElem.vue';
import LoadingElem from '../../components/LoadingElem.vue';

export default {
    components: { LoadingElem, ListGroupElem },
    data() {
        return {
            loadingContent: true,
            subscriptions: [],
            hasActiveSubscription: false,
        }
    },
    created() {
        this.$store.commit('addPageData', {
            title: 'Minhas assinaturas',
            icon: 'list',
        });
    },
    mounted() {
        this.$axios.req({
            action: '/dash/subscriptions',
            method: 'get',
            success: (resp) => {
                this.subscriptions = [
                    ...resp.data?.subscriptions
                ];

                if (this.subscriptions[0] ?? null) {
                    let sub = this.subscriptions[0];
                    if (sub.status === 'active') {
                        this.hasActiveSubscription = true;
                    }
                }
            },
            finally: () => {
                this.loadingContent = false;
            }
        });
    }
}
</script>

<style lang="css" scoped>
.subscription .status {
    padding-top: 2px;
    padding-bottom: 2px;
}

.subscription-active .status {
    @apply bg-emerald-600 text-emerald-50;
}

.subscription-pending .status {
    @apply bg-sky-200 text-sky-700;
}

.subscription-ended .status {
    @apply bg-yellow-200 text-yellow-700;
}

.subscription-canceled .status {
    @apply bg-red-200 text-red-700;
}</style>