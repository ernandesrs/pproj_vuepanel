<template>
    <div class="flex justify-center">
        <div class="basis-full lg:basis-4/5 xl:basis-3/5">
            <FormElem action="/me/update" method="put" :data="form" :callbacks="{
                success: success
            }">
                <div class="flex flex-col sm:flex-row gap-6 mb-6">
                    <div class="basis-full sm:basis-1/2">
                        <InputGroupForm :attrs="{
                            id: 'first_name'
                        }" label="Nome:" v-model="form.first_name"
                            :error-message="form.errors.first_name" />
                    </div>

                    <div class="basis-full sm:basis-1/2">
                        <InputGroupForm :attrs="{
                            id: 'last_name'
                        }" label="Sobrenome:" v-model="form.last_name"
                            :error-message="form.errors.last_name" />
                    </div>
                </div>

                <div class="flex flex-row gap-6 mb-6">
                    <div class="basis-2/3 sm:basis-1/2">
                        <InputGroupForm :attrs="{
                            id: 'username'
                        }" label="Usuário:" v-model="form.username"
                            :error-message="form.errors.username" />
                    </div>

                    <div class="basis-1/3 sm:basis-1/2">
                        <InputGroupForm :attrs="{
                            id: 'gender',
                            type: 'select'
                        }" label="Gênero:" v-model="form.gender"
                            :error-message="form.errors.gender" :options="[
                                {
                                    value: 'n',
                                    text: 'Não definir',
                                },
                                {
                                    value: 'm',
                                    text: 'Masculino',
                                },
                                {
                                    value: 'f',
                                    text: 'Feminino',
                                },
                            ]" />
                    </div>
                </div>

                <div class="flex mb-6">
                    <div class="basis-full">
                        <InputGroupForm :attrs="{
                            id: 'email',
                            readonly: true
                        }" label="E-mail:" v-model="form.email"
                            :error-message="form.errors.email" />
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-6 mb-6">
                    <div class="basis-full sm:basis-1/2">
                        <InputGroupForm :attrs="{
                            id: 'password',
                            type: 'password'
                        }" label="Senha:" v-model="form.password"
                            :error-message="form.errors.password" />
                    </div>

                    <div class="basis-full sm:basis-1/2">
                        <InputGroupForm :attrs="{
                            id: 'password_confirmation',
                            type: 'password'
                        }" label="Confirmar senha:" v-model="form.password_confirmation"
                            :error-message="form.errors.password_confirmation" />
                    </div>
                </div>
                <div class="text-center">
                    <DefaultButton type="submit" text="Atualizar meus dados"
                        variant="primary" icon="bi bi-check-lg"
                        :loading="form.submitting" />
                </div>
            </FormElem>
        </div>
    </div>
</template>

<script>

import InputGroupForm from '../../components/Form/InputGroupForm.vue';
import FormElem from '../../components/Form/FormElem.vue';
import DefaultButton from '../../components/Button/DefaultButton.vue';

export default {
    components: { InputGroupForm, FormElem, DefaultButton },
    data() {
        return {
            form: {
                ...this.$store.getters.getAuthUser,
                errors: {},
                submitting: false
            }
        }
    },
    methods: {
        success(response) {
            this.form.errors = {};
            this.$alerts.add({
                message: 'Seus dados foram atualizados com sucesso!',
                variant: 'success'
            });
        }
    },
}
</script>

<style lang="scss" scoped>

</style>