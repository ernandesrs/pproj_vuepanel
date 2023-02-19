<template>
    <LoadingElem :loading="loadingContent" loading-text="Carregando..." />

    <ModalElem @closed="editCardModalClosed" :show="editCardModal.show" size="normal"
        :title="editCardModal.title" position="top">
    </ModalElem>

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
        callback: editCardModalShow
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
import ModalElem from '../../components/Modal/ModalElem.vue';

export default {
    components: { LoadingElem, ListGroupElem, ModalElem },
    data() {
        return {
            loadingContent: true,
            creditCards: [],
            editCardModal: {
                show: false,
                title: null,
                card: null,
            }
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
        createCallback() {
            this.editCardModal.show = true;
            this.editCardModal.title = 'Novo cartão de crédito';
        },
        editCardModalShow(response) {
            this.editCardModal.show = true;
            this.editCardModal.card = response.data.card;
            this.editCardModal.title = 'Editar cartão final ' + this.editCardModal.card.last_digits;
        },
        editCardModalClosed() {
            this.editCardModal.show = false;
            this.editCardModal.card = null;
        }
    },
}
</script>

<style lang="css" scoped></style>