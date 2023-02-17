<template>
    <div class="flex items-center shadow px-3 py-3 mb-2 relative overflow-hidden">
        <div>
            <slot />
        </div>
        <div class="ml-auto">
            <div class="flex gap-2">
                <DefaultButton @click="updateItem" size="small" variant="primary"
                    icon="bi bi-pencil-square" text="" />
                <DefaultButton v-if="deleteAction?.show" @click="deleteItem" size="small"
                    variant="danger" outlined icon="bi bi-trash" text="" />
            </div>
        </div>

        <Transition enter-from-class="translate-x-full"
            enter-active-class="duration-300 ease-in-out" leave-to-class="translate-x-full"
            leave-active-class="duration-200 ease-out">
            <div v-if="status === 'delete'"
                class="bg-dark flex items-center h-full px-3 absolute top-0 right-0 shadow rounded-lg">
                <div class="text-red-400 font-normal text-right w-full px-5">
                    Excluir este item?
                </div>
                <div class="ml-auto">
                    <div class="flex gap-2">
                        <DefaultButton @click="deleteConfirm" size="small" variant="danger"
                            icon="bi bi-check-lg" text="" :loading="deleting" />
                        <DefaultButton @click="deleteCancel" size="small" variant="primary"
                            icon="bi bi-x" text="" />
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>

import DefaultButton from '../Button/DefaultButton.vue';

export default {
    components: { DefaultButton, },
    props: {
        index: {
            type: Number,
            default: null
        },
        deleteAction: {
            type: Object,
            default: {
                show: false,
                action: null,
                method: 'delete',
                successCallback: null,
            }
        }
    },
    data() {
        return {
            status: 'show',
            deleting: false
        }
    },
    methods: {
        updateItem() {
            this.status = 'update';
        },
        deleteItem() {
            this.status = 'delete';

            document.addEventListener("click", this.clickOutDeleteItemPopupListener);
        },
        deleteConfirm() {
            if (this.deleteAction?.action) {
                this.deleting = true;
                this.$axios.request(this.deleteAction.action, {}, this.deleteAction.method).then((resp) => {
                    this.$alerts.add({
                        message: 'Item da lista excluído com sucesso',
                        variant: 'success'
                    });

                    this.$emit('deleteItem', this.index);
                }).catch((resp) => {
                    // 
                }).then(() => {
                    this.deleting = false;
                });
            } else {
                this.$emit('deleteItem', this.index);
            }
        },
        deleteCancel() {
            this.status = 'show';

            document.removeEventListener("click", this.clickOutDeleteItemPopupListener);
        },
        clickOutDeleteItemPopupListener(event) {
            if (!this.$el.contains(event.target)) {
                this.deleteCancel();
            }
        }
    },
}

</script>

<style lang="css" scoped></style>