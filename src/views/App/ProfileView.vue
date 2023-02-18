<template>
    <div class="flex flex-col justify-center items-center pt-2 pb-6 relative">
        <div
            class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 border-2 border-light-dark rounded-full flex items-center justify-center">
            <img v-if="form.photo_url" class="w-full h-full rounded-full"
                :src="form.photo_url" :alt="form.first_name">
            <p v-else class="text-4xl sm:text-5xl md:text-6xl" v-html="form.first_name[0]">
            </p>
        </div>
        <div class="relative flex gap-1 pt-2">
            <DefaultButton @click="uploadButtonClick" icon="bi bi-upload" variant="success"
                text="Nova foto" :loading="uploading" size="small" />
            <DefaultButton @click="deleteButtonClick" v-if="form.photo_url" icon="bi bi-trash"
                variant="danger" text="Excluir foto" :loading="deleting" size="small"
                outlined />
            <input @change="uploadPhoto" ref="inputPhotoUpload" type="file" class="hidden"
                accept="image/*" />
        </div>
    </div>

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
                    <DefaultButton type="submit" text="Atualizar meus dados" variant="primary"
                        icon="bi bi-check-lg" :loading="form.submitting" />
                </div>
            </FormElem>
        </div>
    </div>
</template>

<script>

import messages from '../../services/messages';
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
            },
            deleting: false,
            uploading: false,
        }
    },
    created() {
        this.$store.commit('addPageData', {
            title: 'Meu perfil',
            icon: 'bi bi-person',
        });
    },
    methods: {
        success(response) {
            this.form.errors = {};
            this.$alerts.add({
                message: 'Seus dados foram atualizados com sucesso!',
                variant: 'success'
            });
        },
        uploadButtonClick() {
            this.$refs.inputPhotoUpload.click();
        },
        uploadPhoto(event) {
            let data = new FormData();

            data.append('photo', event.target.files[0]);

            this.form.submitting = true;
            this.uploading = true;
            this.$axios.req({
                action: '/me/photo-upload',
                data: data,
                method: 'post',
                success: (resp) => {
                    this.$alerts.add({
                        message: 'Sua foto foi atualizada com sucesso!',
                        variant: 'success'
                    });
                    this.form.photo_url = resp.data.user.photo_url;
                },
                finally: () => {
                    this.form.submitting = false;
                    this.uploading = false;
                }
            });
        },
        deleteButtonClick() {
            if (!window.confirm('Tem certeza de que quer excluir sua foto?')) {
                return;
            }

            this.deleting = true;
            this.$axios.req({
                action: '/me/photo-delete',
                method: 'delete',
                success: () => {
                    this.form.photo_url = null;
                },
                finally: () => {
                    this.deleting = false;
                }
            });
        }
    },
}
</script>

<style lang="css" scoped></style>