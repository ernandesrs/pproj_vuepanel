<template>
    <LoadingElem :loading="loadingContent" loading-text="Carregando..." />

    <ModalElem @closed="editCardModalClosed" :show="editCardModal.show" size="normal"
        :title="editCardModal.title" position="top">
        <FormElem method="get" :data="editCardModal.card"
            :callbacks="{
                success: (response) => {
                    console.log(response);
                },
                finally: () => {
                    console.log(899);
                }
            }">
            <div class="mb-3">
                <InputGroupForm label="Nome para o cartão:"
                    v-model="editCardModal.card.card_name" />
            </div>

            <div class="mb-3">
                <InputGroupForm label="Cliente:" v-model="editCardModal.card.card_holder_name"
                    :attrs="{
                        disabled: editCardModal.card?.id ? true : false
                    }" />
            </div>

            <div class="mb-3">
                <InputGroupForm label="Número:" v-model="editCardModal.card.card_number"
                    :attrs="{
                        disabled: editCardModal.card?.id ? true : false
                    }" />
            </div>

            <div class="mb-3 flex gap-3">
                <div class="basis-full md:basis-5/12">
                    <InputGroupForm label="CVV:" v-model="editCardModal.card.card_cvv" :attrs="{
                        disabled: editCardModal.card?.id ? true : false
                    }" />
                </div>
                <div class="basis-full md:basis-7/12">
                    <InputGroupForm label="Data de validade:"
                        v-model="editCardModal.card.card_expiration_date" :attrs="{
                            disabled: editCardModal.card?.id ? true : false
                        }" />
                </div>
            </div>

            <div class="mb-3 text-center">
                <DefaultButton icon="checkLg"
                    :text="editCardModal.card?.id ? 'Atualizar cartão' : 'Salvar cartão'"
                    variant="success" :loading="editCardModal.card?.submitting" />
            </div>
        </FormElem>
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
import FormElem from '../../components/Form/FormElem.vue';
import InputGroupForm from '../../components/Form/InputGroupForm.vue';
import DefaultButton from '../../components/Button/DefaultButton.vue';

export default {
    components: { LoadingElem, ListGroupElem, ModalElem, FormElem, InputGroupForm, DefaultButton },
    data() {
        return {
            loadingContent: true,
            creditCards: [],
            editCardModal: {
                show: false,
                title: null,
                card: {
                    card_name: null,
                    card_holder_name: null,
                    card_number: null,
                    card_last_digits: null,
                    card_expiration_date: null,
                    card_cvv: null
                },
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
            this.editCardModal.card = {
                ...response.data.card,
                card_name: response.data.card?.name ?? 'Cartão final ' + response.data.card?.last_digits,
                card_holder_name: response.data.card.holder_name,
                card_number: response.data.card.number,
                card_last_digits: response.data.card.last_digits,
                card_expiration_date: response.data.card.expiration_date,
                card_cvv: response.data.card.cvv,
            };
            this.editCardModal.title = 'Editar cartão final ' + this.editCardModal.card.card_last_digits;
        },
        editCardModalClosed() {
            this.editCardModal.show = false;
            this.editCardModal.card = {};
        }
    },
}
</script>

<style lang="css" scoped></style>