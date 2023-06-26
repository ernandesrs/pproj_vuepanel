<template>
    <LoadingElem :loading="!cards && !packages" loading-text="Carregando..." />
    <div v-if="cards && packages">
        <h1 class="text-3xl font-medium text-center py-3">
            Escolha um de nossos planos PRO
        </h1>

        <!-- packages -->
        <div class="flex justify-center py-5 gap-5">
            <div v-if="packages.length" v-for="pack in packages" class="basis-3/12">
                <CardElem :title="pack.name" title-class="text-center"
                    :class="{ 'bg-primary-dark': (pack.id === form.package_id) }">
                    <template v-slot:content>
                        <div class="text-center">
                            <p class="text-4xl font-bold mb-3">R$ {{ pack.price }}</p>
                            <p class="text-md">{{ pack.description }}</p>
                        </div>
                    </template>
                    <template v-slot:footer>
                        <div class="text-center">
                            <DefaultButton @click="togglePackageSelection" :data-packid="pack.id"
                                :text="pack.id === form.package_id ? null : 'Escolher'"
                                :icon="pack.id === form.package_id ? 'checkLg' : null"
                                :variant="pack.id === form.package_id ? 'success' : 'primary'"
                                :disabled="pack.id === form.package_id" />
                        </div>
                    </template>
                </CardElem>
            </div>
            <div v-else class="basis-12/12 text-center">
                <CardElem title="Nenhum plano cadastrado" title-class="px-1">
                    <template v-slot:content>
                        <p class="text-4xl">:(</p>
                    </template>
                </CardElem>
            </div>
        </div>

        <h1 class="text-3xl font-medium text-center py-3">
            Escolha um cartão de crédito
        </h1>

        <!-- cards -->
        <div class="flex flex-wrap justify-center py-5 gap-5">
            <div v-if="cards.length" v-for="card in cards" class="basis-3/12">
                <CardElem :class="{ 'bg-primary-dark': (card.id === form.card_id) }">
                    <template v-slot:content>
                        <div class="flex gap-4 text-sm mb-3">
                            <div>
                                <p class="font-semibold">Número:</p>
                                <p>{{ card.number }}</p>
                            </div>
                            <div>
                                <p class="font-semibold">Bandeira:</p>
                                <p>{{ card.brand.toUpperCase() }}</p>
                            </div>
                        </div>
                        <div class="flex gap-4 text-sm">
                            <div>
                                <p class="font-semibold">Vencimento:</p>
                                <p>{{ card.expiration_date }}</p>
                            </div>
                        </div>
                    </template>
                    <template v-slot:footer>
                        <div class="text-center">
                            <DefaultButton @click="toggleCardSelection" :data-cardid="card.id"
                                :text="card.id === form.card_id ? null : 'Escolher'"
                                :icon="card.id === form.card_id ? 'checkLg' : null"
                                :variant="card.id === form.card_id ? 'success' : 'primary'"
                                :disabled="card.id === form.card_id" />
                        </div>
                    </template>
                </CardElem>
            </div>
            <div v-else class="basis-3/12 text-center">
                <CardElem title="Nenhum cartão cadastrado" title-class="px-1">
                    <template v-slot:content>
                        <DefaultButton icon="plus" text="Cadastrar" :to="{ name: 'app.credit-cards' }" />
                    </template>
                </CardElem>
            </div>
        </div>

        <h1 class="text-3xl font-medium text-center py-3">
            Escolha o número de parcelas
        </h1>
        <p class="text-xl text-center">
            Tudo sem juros!
        </p>

        <!-- instalments -->
        <div class="flex flex-wrap justify-center pt-5 pb-8 gap-5">
            <DefaultButton @click="toggleInstalmentSelection" v-for="instalment in instalments" :text="'' + instalment"
                variant="primary" :outlined="form.instalments === instalment ? false : true"
                :data-instalment="instalment" />
        </div>

        <h1 class="text-5xl font-medium text-center py-3">
            Finalizar compra
        </h1>

        <!-- finaly -->
        <div v-if="form.card_id && form.package_id && form.instalments" class="py-5 text-center">
            <div class="mb-6">
                <h2 class="text-lg font-bold">Plano escolhido</h2>
                <p class="mb-2">{{ (packages.find((pack) => pack.id === form.package_id)).name }} - R$ {{
                    (packages.find(function (pack) {
                        return pack.id === form.package_id;
                    })).price }}</p>
                <h2 class="text-lg font-bold">Pagamento com</h2>
                <p class="mb-2">{{ (cards.find((card) => card.id === form.card_id)).number }} - {{ (cards.find((card) =>
                    card.id
                    ===
                    form.card_id)).brand.toUpperCase() }}</p>
                <p class="text-sm">em {{ form.instalments }}x sem juros</p>
            </div>
            <div v-if="form.errors?.card_id || form.errors?.package_id || form.errors?.installments"
                class="mb-6 text-sm text-red-400 border border-red-400 py-2">
                <p v-if="form.errors?.card_id">{{ form.errors?.card_id[0] }}</p>
                <p v-if="form.errors?.package_id">{{ form.errors?.package_id[0] }}</p>
                <p v-if="form.errors?.installments">{{ form.errors?.installments[0] }}</p>
            </div>
            <DefaultButton @click="confirmAndFinalizeSubscription" icon="checkLg" text="Confirmar e finalizar" size="large"
                variant="success" :loading="form.submitting" />
        </div>
        <div v-else>
            <p class="text-center text-red-200">
                Escolha um plano, um cartão e o número de parcelas.
            </p>
        </div>
    </div>
</template>

<script>

import LoadingElem from '../../components/LoadingElem.vue';
import CardElem from '../../components/Card/CardElem.vue';
import DefaultButton from '../../components/Button/DefaultButton.vue';

export default {
    components: { LoadingElem, CardElem, DefaultButton },
    data() {
        return {
            cards: null,
            packages: null,
            instalments: [1, 2, 3, 4, 6, 7, 8, 9, 10],
            form: {
                card_id: null,
                package_id: null,
                instalments: null,
                errors: {},
                submitting: false
            }
        }
    },
    created() {
        this.$store.commit('addPageData', {
            title: 'Fazer um assinatura PRO',
            icon: 'cartPlus'
        });
    },
    mounted() {
        this.$axios.req({
            action: '/dash/packages',
            method: 'get',
            success: (resp) => {
                this.packages = resp?.data?.packages
            }
        });

        this.$axios.req({
            action: '/dash/credit-cards',
            method: 'get',
            success: (resp) => {
                this.cards = resp?.data?.cards;
            }
        });
    },
    methods: {
        togglePackageSelection(e) {
            let target = parseInt(e.target.getAttribute("data-packid"));
            this.form.package_id = target;
        },
        toggleCardSelection(e) {
            let target = parseInt(e.target.getAttribute("data-cardid"));
            this.form.card_id = target;
        },
        toggleInstalmentSelection(e) {
            let target = parseInt(e.target.getAttribute("data-instalment"));
            this.form.instalments = target;
        },
        confirmAndFinalizeSubscription() {
            this.form.submitting = true;
            this.$axios.req({
                action: '/dash/subscriptions',
                method: 'post',
                data: {
                    package_id: this.form.package_id,
                    card_id: this.form.card_id,
                    installments: this.form.instalments
                },
                success: (resp) => {
                    if (resp?.data?.success) {
                        this.$alerts.add({
                            message: 'Parabéns, assinatura efetuada com sucesso!',
                            variant: 'success'
                        });
                        this.$router.push({ name: "app.home" });
                    }
                },
                fail: (resp) => {
                    if (resp.response?.data?.errors) {
                        this.form.errors = resp.response?.data?.errors;
                    }
                },
                finally: () => {
                    this.form.submitting = false;
                }
            });
        }
    }
}

</script>