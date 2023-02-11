<template>

    <FormElem action="/auth/update-password" method="put" :data="form" :callbacks="{
        success: success
    }">
        <div class="mb-3">
            <InputGroupForm :attrs="{
                id: 'password',
                name: 'password',
                type: 'password'
            }" label="Senha:" v-model="form.password"
                :error-message="form.errors.password" />
        </div>

        <div class="mb-3">
            <InputGroupForm :attrs="{
                id: 'password_confirmation',
                name: 'password_confirmation',
                type: 'password'
            }" label="Confirmar senha:" v-model="form.password_confirmation"
                :error-message="form.errors.password_confirmation" />
        </div>

        <div class="text-center">
            <DefaultButton text="Atualizar senha" icon="bi bi-check-lg"
                :loading="form.submitting" />
        </div>
    </FormElem>

</template>

<script>

import InputGroupForm from '../../components/Form/InputGroupForm.vue';
import DefaultButton from '../../components/Button/DefaultButton.vue';
import FormElem from '../../components/Form/FormElem.vue';

export default {
    components: { InputGroupForm, DefaultButton, FormElem },
    data() {
        return {
            form: {
                token: this.$route?.query?.token,
                password: null,
                password_confirmation: null,
                errors: {
                },
                submitting: false
            }
        };
    },
    beforeCreate() {
        if (!this.$route?.query?.token)
            this.$router.push({ name: "auth.login" })
    },
    created() {
        this.$store.commit("pageIcon", "bi bi-check-circle");
        this.$store.commit("pageTitle", "Atualizar senha");
    },
    methods: {
        success() {
            this.$router.push({ name: "auth.login" });
        }
    },
}
</script>

<style lang="scss" scoped>

</style>