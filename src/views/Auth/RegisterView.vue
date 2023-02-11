<template>
    <FormElem action="/auth/register" method="post" :data="form" :callbacks="{
        success: success
    }">
        <div class="flex gap-3">
            <div class="basis-full md:basis-1/2 mb-3">
                <InputGroupForm label="Nome:" :attrs="{
                    id: 'first_name',
                    name: 'first_name',
                    type: 'text'
                }" :error-message="form.errors.first_name" v-model="form.first_name" />
            </div>
            <div class="basis-full md:basis-1/2 mb-3">
                <InputGroupForm label="Sobrenome:" :attrs="{
                    id: 'last_name',
                    name: 'last_name',
                    type: 'text'
                }" :error-message="form.errors.last_name" v-model="form.last_name" />
            </div>
        </div>

        <div class="flex gap-3">
            <div class="basis-full md:basis-1/2 mb-3">
                <InputGroupForm label="Usuário:" :attrs="{
                    id: 'username',
                    name: 'username',
                    type: 'text'
                }" :error-message="form.errors.username" v-model="form.username" />
            </div>
            <div class="basis-full md:basis-1/2 mb-3">
                <InputGroupForm label="Gênero:" :attrs="{
                    type: 'select',
                    id: 'gender',
                    name: 'gender'
                }" :error-message="form.errors.gender" v-model="form.gender" :options="[
    {
        value: 'n',
        text: 'Não definir'
    },
    {
        value: 'm',
        text: 'Masculino'
    },
    {
        value: 'f',
        text: 'Feminino'
    }
]" />
            </div>
        </div>

        <div class="flex gap-3">
            <div class="basis-full mb-3">
                <InputGroupForm label="E-mail:" :attrs="{
                    id: 'email',
                    name: 'email',
                    type: 'email'
                }" :error-message="form.errors.email" v-model="form.email" />
            </div>
        </div>

        <div class="flex gap-3 mb-3">
            <div class="basis-full md:basis-1/2 mb-3">
                <InputGroupForm label="Senha:" :attrs="{
                    id: 'password',
                    name: 'password',
                    type: 'password'
                }" :error-message="form.errors.password" v-model="form.password" />
            </div>
            <div class="basis-full md:basis-1/2 mb-3">
                <InputGroupForm label="Confirmar senha:" :attrs="{
                    id: 'password_confirmation',
                    name: 'password_confirmation',
                    type: 'password'
                }" :error-message="form.errors.password_confirmation"
                    v-model="form.password_confirmation" />
            </div>
        </div>

        <div class="text-center">
            <DefaultButton text="Registrar" icon="bi bi-check-lg"
                :loading="form.submitting" />
        </div>
    </FormElem>
</template>

<script>

import DefaultButton from '../../components/Button/DefaultButton.vue';
import FormElem from '../../components/Form/FormElem.vue';
import InputGroupForm from '../../components/Form/InputGroupForm.vue';

export default {
    components: { InputGroupForm, DefaultButton, FormElem },
    data() {
        return {
            form: {
                first_name: null,
                last_name: null,
                username: null,
                gender: 'n',
                email: null,
                password: null,
                password_confirmation: null,
                errors: {
                },
                submitting: false
            }
        }
    },
    created() {
        this.$store.commit("pageTitle", "Criar uma conta");
        this.$store.commit("pageIcon", "bi bi-person-circle");
    },
    methods: {
        success() {
            this.$router.push({ name: "auth.login" });
        }
    },
}
</script>

<style lang="css" scoped>

</style>