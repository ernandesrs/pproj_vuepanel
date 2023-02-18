<template>
    <LoadingElem :loading="loadingContent" loading-text="Carregando..." />
    <div v-if="!loadingContent">
        <ListGroupElem :items="subscriptions">
            <template #listItemContent="{ item }">
                {{ item.starts_in }}
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
            subscriptions: [
                {
                    id: 2091,
                    created_at: '2023-01-07T15:10:25.000000Z',
                    starts_in: '29/10/2022',
                    ends_in: '29/11/2022',
                    status: 'ended'
                },
                {
                    id: 202,
                    created_at: '2023-01-07T15:10:25.000000Z',
                    starts_in: '29/10/2022',
                    ends_in: '29/11/2022',
                    status: 'canceled'
                },
                {
                    id: 291,
                    created_at: '2023-01-07T15:10:25.000000Z',
                    starts_in: '29/10/2022',
                    ends_in: '29/11/2022',
                    status: 'ended'
                },
                {
                    id: 231,
                    created_at: '2023-01-07T15:10:25.000000Z',
                    starts_in: '29/10/2022',
                    ends_in: '29/11/2022',
                    status: 'ended'
                },
                {
                    id: 3112,
                    created_at: '2023-01-07T15:10:25.000000Z',
                    starts_in: '29/10/2022',
                    ends_in: '29/11/2022',
                    status: 'ended'
                },
                {
                    id: 312,
                    created_at: '2023-01-07T15:10:25.000000Z',
                    starts_in: '29/10/2022',
                    ends_in: '29/11/2022',
                    status: 'ended'
                },
                {
                    id: 904,
                    created_at: '2023-01-07T15:10:25.000000Z',
                    starts_in: '29/10/2022',
                    ends_in: '29/11/2022',
                    status: 'ended'
                },
                {
                    id: 94,
                    created_at: '2023-01-07T15:10:25.000000Z',
                    starts_in: '29/10/2022',
                    ends_in: '29/11/2022',
                    status: 'ended'
                }
            ]
        }
    },
    created () {
        this.$store.commit('addPageData', {
            title: 'Minhas assinaturas',
            icon: 'bi bi-list',
        });
    },
    mounted() {
        this.$axios.request('/dash/subscriptions', {}, 'get').then((resp) => {
            this.subscriptions = [
                ...this.subscriptions,
                ...resp.data?.subscriptions
            ];
        }).catch((resp) => {
            this.$alerts.addError(resp.response?.data?.error);
        }).then(() => {
            this.loadingContent = false;
        });
    },
}
</script>

<style lang="css" scoped></style>