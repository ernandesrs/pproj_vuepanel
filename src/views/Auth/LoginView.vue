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
    </div>

</template>

<script>

import InputGroupForm from '../../components/Form/InputGroupForm.vue';

export default {
    components: { InputGroupForm },
    data() {
        return {
            form: {
                email: '',
                password: null,
                errors: {
                    email: '',
                }
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