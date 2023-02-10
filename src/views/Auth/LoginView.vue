<template>

    <div class="mb-3">
        <InputGroupForm :attrs="{
            id: 'email',
            name: 'email',
            type: 'email'
        }" label="E-mail" v-model="form.email" :error-message="form.errors.email" />
    </div>

    <div class="mb-3">
        <InputGroupForm :attrs="{
            id: 'password',
            name: 'password',
            type: 'password'
        }" label="Senha" v-model="form.password" :error-message="form.errors.password" />
        <p class="py-1 text-sm text-right text-primary">
            <LinkElem text="Eu esqueci a senha" :to="{ name: 'auth.forget' }" />
        </p>
    </div>

    <div class="text-center">
        <DefaultButton @click="form.submitting=true" text="Fazer login"
            icon="bi bi-check-lg" :loading="form.submitting" />
    </div>

</template>

<script>

import InputGroupForm from '../../components/Form/InputGroupForm.vue';
import DefaultButton from '../../components/Button/DefaultButton.vue';
import LinkElem from '../../components/LinkElem.vue';

export default {
    components: { InputGroupForm, DefaultButton, LinkElem },
    data() {
        return {
            form: {
                email: '',
                password: null,
                errors: {
                    email: '',
                },
                submitting: false
            }
        };
    },
    created() {
        this.$store.commit("pageIcon", "bi bi-box-arrow-in-right");
        this.$store.commit("pageTitle", "Acessar conta");
    },
}
</script>

<style lang="scss" scoped>

</style>