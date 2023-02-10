<template>
    <div class="mb-3">
        <InputGroupForm :attrs="{
            id: 'email',
            name: 'email',
            type: 'email'
        }" label="E-mail" v-model="form.email" :error-message="form.errors.email" />
    </div>

    <div class="text-center">
        <DefaultButton text="Recuperar senha"
            icon="bi bi-check-lg" :loading="form.submitting" />
    </div>
</template>

<script>

import DefaultButton from '../../components/Button/DefaultButton.vue';
import InputGroupForm from '../../components/Form/InputGroupForm.vue';

export default {
    components: { InputGroupForm, DefaultButton },
    data() {
        return {
            form: {
                email: '',
                errors: {
                    email: '',
                },
                submitting: false
            }
        }
    },
    created() {
        this.$store.commit("pageTitle", "Esquecia a senha");
        this.$store.commit("pageIcon", "bi bi-shield-lock");
    }
}
</script>

<style lang="scss" scoped>

</style>