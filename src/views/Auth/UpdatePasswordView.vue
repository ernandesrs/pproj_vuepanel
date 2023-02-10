<template>

    <div class="mb-3">
        <InputGroupForm :attrs="{
            id: 'password',
            name: 'password',
            type: 'password'
        }" label="Senha:" v-model="form.password" :error-message="form.errors.password" />
    </div>

    <div class="mb-3">
        <InputGroupForm :attrs="{
            id: 'password_confirmation',
            name: 'password_confirmation',
            type: 'password'
        }" label="Confirmar senha:" v-model="form.password_confirmation" :error-message="form.errors.password_confirmation" />
    </div>

    <div class="text-center">
        <DefaultButton text="Atualizar senha"
            icon="bi bi-check-lg" :loading="form.submitting" />
    </div>

</template>

<script>

import InputGroupForm from '../../components/Form/InputGroupForm.vue';
import DefaultButton from '../../components/Button/DefaultButton.vue';

export default {
    components: { InputGroupForm, DefaultButton },
    data() {
        return {
            form: {
                password: null,
                password_confirmation: null,
                errors: {
                },
                submitting: false
            }
        };
    },
    created() {
        this.$store.commit("pageIcon", "bi bi-check-circle");
        this.$store.commit("pageTitle", "Atualizar senha");
    },
}
</script>

<style lang="scss" scoped>

</style>