<template>
    <LoadingElem :loading="loadingContent" loading-text="Carregando..." />
    <div v-if="!loadingContent">
        <ListGroupElem :items="creditCards" :list-actions="{
            show: true,
            buttons: {
                create: {
                    // to: {
                    //     name: 'app.credit-cards'
                    // },
                    // url: 'https://www.google.com',
                    // action: '/dash/subscriptions',
                    method: 'get',
                    callback: createCallback
                }
            },
            filter: {
                search_in: ['brand', 'last_digits', 'expiration_date']
            }
        }" :item-actions="{
    show: true,
    edit: {
        // to: {
        //     name: 'app.credit-cards.edit'
        // },
        action: '/dash/credit-cards/:id',
        method: 'get',
        callback: editCallback
    },
    delete: {
        action: '/dash/credit-cards/:id',
        method: 'delete',
        // callback: deleteCallback,
        confirmText: 'Excluir este cartão de crédito?'
    }
}">
            <template #listItemContent="{ item }">
                <div class="py-2 gap-2 text-base font-semibold">
                    #ID{{ item.id }} - {{ item.name ?? 'Cartão ' + item.brand }}
                </div>

                <div class="px-5">
                    <div>
                        <p>
                            Número: {{ item.number }}
                        </p>
                    </div>

                    <div class="flex justify-between gap-3">
                        <p>Rede: {{ item.brand }}</p>
                        <p>Validade: {{ item.expiration_date }}</p>
                    </div>
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
            creditCards: []
        }
    },
    created() {
        this.$store.commit('addPageData', {
            title: 'Meus cartões',
            icon: 'creditCard',
        });
    },
    mounted() {
        this.$axios.req({
            action: '/dash/credit-cards',
            success: (response) => {
                this.creditCards = [
                    ...response.data?.cards
                ];
            },
            finally: () => {
                this.loadingContent = false;
            }
        });
    },
    methods: {
        createCallback(r) {
            console.log('criar item: ', r);
        },
        editCallback(r) {
            console.log('edit item: ', r);
        },
        deleteCallback() {
            console.log('deletou item');
        }
    },
}
</script>

<style lang="css" scoped></style>