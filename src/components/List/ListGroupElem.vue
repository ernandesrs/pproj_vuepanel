<template>
    <div v-if="listActions.show" class="flex items-center pb-6">
        <!-- buttons -->
        <div class="flex gap-2">
            <DefaultButton v-if="showCreateListItemButton" @click="createListItem" text="Novo"
                icon="bi bi-plus-lg" variant="success" :loading="createListItemRequesting" />
        </div>
        <!-- /buttons -->

        <!-- filter -->
        <div class="ml-auto">
            <form @submit.prevent="filterList">
                <div class="flex gap-1">
                    <InputGroupForm placeholder="Pesquisar por..."
                        v-model="filterForm.search" />
                    <DefaultButton type="submit" icon="bi bi-search" text="" />
                </div>
            </form>
        </div>
        <!-- /filter -->
    </div>
    <div>
        <ListItem @deleteItem="deleteListItem" v-for="item, index in listItems" :key="item"
            :item="item" :index="parseInt(index)" :showActionButtons="itemActions.show">
            <slot name="listItemContent" v-bind="{ item: item, index: index }" />
        </ListItem>
    </div>
</template>

<script>

import DefaultButton from '../Button/DefaultButton.vue';
import InputGroupForm from '../Form/InputGroupForm.vue';
import ListItem from './ListItem.vue';

export default {
    components: { ListItem, DefaultButton, InputGroupForm },
    emits: { createListItem: null },
    props: {
        items: {
            type: [Array],
            default: []
        },
        listActions: {
            type: Object,
            default: {
                show: false,
                filter: {
                    action: null,
                    metohd: 'get'
                },
                buttons: {
                    create: {
                        to: null,
                        url: null,
                        action: null,
                        callback: null
                    }
                }
            }
        },
        itemActions: {
            type: Object,
            default: {
                show: false
            }
        }
    },
    data() {
        return {
            listItems: this.items,
            createListItemRequesting: false,
            filterForm: {
                search: null
            }
        }
    },
    watch: {
        listItems: {
            deep: true,
            handler(nv, ov) {
                if (ov) {
                    this.$emit('update:items');
                }
            }
        }
    },
    methods: {
        createListItem(event) {
            let createButton = this.listActions?.buttons?.create;
            let promisse = null;

            if (createButton.action) {
                this.createListItemRequesting = true;
                promisse = this.$axios.request(createButton.action, {}, createButton.method);
            } else if (createButton.url) {
                window.location.href = createButton.url;
            } else if (createButton.to) {
                this.$router.push(createButton.to);
            }

            if (promisse) {
                promisse.then((resp) => {
                    if (createButton?.callback) {
                        createButton.callback({
                            event: event,
                            response: resp
                        });
                    }

                    this.$emit('createListItem', {
                        event: event,
                        response: resp
                    });
                }).then(() => {
                    this.createListItemRequesting = false;
                });
            } else {
                if (createButton?.callback) {
                    createButton.callback({
                        event: event
                    });
                }

                this.$emit('createListItem', {
                    event: event
                });
            }

        },
        deleteListItem(item) {
            this.listItems.splice(item, 1);
        },
        filterList() {
            console.log('filter list');
        }
    },
    computed: {
        showCreateListItemButton() {
            let createButton = this.listActions?.buttons?.create;

            return !createButton ? false : (createButton.to || createButton.url || createButton.action || createButton.callback);
        }
    },
}

</script>

<style lang="css" scoped></style>