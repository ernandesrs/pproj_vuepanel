<template>
    <div
        class="flex items-center shadow px-3 py-2 mb-2 relative overflow-hidden hover:bg-dark-dark hover:bg-opacity-10 duration-200">
        <div>
            <slot />
        </div>
        <div v-if="showActionButtons" class="ml-auto">
            <div class="flex gap-2">
                <DefaultButton v-if="showEditButton" @click="editItem" size="small"
                    variant="primary" icon="pencilSquare" text="" :loading="editing" />
                <DefaultButton v-if="showDeleteButton" @click="deleteItem" size="small"
                    variant="danger" outlined icon="trash" text="" :disabled="editing" />
            </div>
        </div>

        <Transition enter-from-class="translate-x-full"
            enter-active-class="duration-300 ease-in-out" leave-to-class="translate-x-full"
            leave-active-class="duration-200 ease-out">
            <div v-if="status === 'delete'"
                class="bg-dark flex items-center h-full px-3 absolute top-0 right-0 shadow rounded-lg">
                <div class="text-red-400 font-normal text-right w-full px-5">
                    {{ deleteAction?.confirmText ?? 'Excluir este item?' }}
                </div>
                <div class="ml-auto">
                    <div class="flex gap-2">
                        <DefaultButton @click="deleteConfirm" size="small" variant="danger"
                            icon="checkLg" text="" :loading="deleting" />
                        <DefaultButton @click="deleteCancel" size="small" variant="primary"
                            icon="x" text="" />
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
        item: {
            type: Object,
            default: {}
        },
        index: {
            type: Number,
            default: null
        },
        showActionButtons: {
            type: Boolean,
            default: false
        },
        editAction: {
            type: Object,
            default: {}
        },
        deleteAction: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            status: 'show',
            deleting: false,
            editing: false
        }
    },
    methods: {
        editItem() {
            this.status = 'update';

            if (this.editAction?.to) {
                this.$router.push(this.editAction.to);
                return;
            }

            if (this.editAction?.action) {
                this.editing = true;
                this.$axios.req({
                    action: this.editAction.action,
                    method: this.editAction?.method ?? 'get',
                    success: (response) => {
                        if (this.editAction?.callback) {
                            this.editAction.callback(response);
                        }

                        this.$emit('editItem');
                    },
                    finally: () => {
                        this.editing = false;
                    }
                });
            } else {
                this.$emit('editItem');
                if (this.editAction?.callback) {
                    this.editAction.callback({
                        id: this.item?.id,
                        index: this.index,
                        item: this.item
                    });
                }
            }
        },
        deleteItem() {
            this.status = 'delete';

            document.addEventListener("click", this.clickOutDeleteItemPopupListener);
        },
        deleteConfirm() {
            this.deleting = true;

            if (this.deleteAction?.action) {
                this.$axios.req({
                    action: this.deleteAction?.action,
                    method: this.deleteAction?.method,
                    success: () => {
                        if (this.deleteAction?.callback) {
                            this.deleteAction?.callback({
                                index: this.index,
                                item: this.item
                            });
                        }

                        this.$emit('deleteItem', this.index);
                    },
                    finally: () => {
                        this.deleting = false;
                        this.hiddenDeleteConfirmPopup();
                    }
                });
            } else {
                this.deleting = false;
                this.$emit('deleteItem', this.index);
                this.hiddenDeleteConfirmPopup();
            }
        },
        deleteCancel() {
            this.hiddenDeleteConfirmPopup();
        },
        hiddenDeleteConfirmPopup() {
            this.status = 'show';

            document.removeEventListener("click", this.clickOutDeleteItemPopupListener);
        },
        clickOutDeleteItemPopupListener(event) {
            if (!this.$el.contains(event.target)) {
                this.deleteCancel();
            }
        }
    },
    computed: {
        showEditButton() {
            return this.editAction ? this.editAction?.to || this.editAction?.action || this.editAction?.callback : false;
        },
        showDeleteButton() {
            return this.deleteAction ? this.deleteAction?.action || this.deleteAction?.callback : false;
        }
    }
}

</script>

<style lang="css" scoped></style>