<template>

    <FormElem action="/auth/login" method="post" :data="form" :callbacks="{
        success: success
    }">
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
            }" label="Senha" v-model="form.password"
                :error-message="form.errors.password" />
            <p class="py-1 text-sm text-right text-primary">
                <LinkElem text="Eu esqueci a senha" :to="{ name: 'auth.forget' }" />
            </p>
        </div>

        <div class="text-center">
            <DefaultButton text="Fazer login" icon="bi bi-check-lg"
                :loading="form.submitting" />
        </div>
    </FormElem>

</template>

<script>

import token from '../../services/token';
import InputGroupForm from '../../components/Form/InputGroupForm.vue';
import DefaultButton from '../../components/Button/DefaultButton.vue';
import LinkElem from '../../components/LinkElem.vue';
import FormElem from '../../components/Form/FormElem.vue';

export default {
    components: { InputGroupForm, DefaultButton, LinkElem, FormElem },
    data() {
        return {
            form: {
                email: '',
                password: null,
                errors: {},
                submitting: false
            }
        };
    },
    created() {
        this.$store.commit("pageIcon", "bi bi-box-arrow-in-right");
        this.$store.commit("pageTitle", "Acessar conta");
    },
    methods: {
        success(response) {
            // login process: save api token on cookie, add authenticated user on vuex store
            token.add(response.data.access.full, response.data.access.expire_in_minutes);
            this.$store.commit("addAuthUser", response.data.user);

            this.$router.push({ name: "app.home" });
        }
    },
}
</script>

<style lang="scss" scoped>

</style>