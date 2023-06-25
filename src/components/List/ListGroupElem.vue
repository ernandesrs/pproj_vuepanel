<template>
    <div v-if="listActions.show" class="flex flex-col md:flex-row items-center pb-6">
        <!-- buttons -->
        <div class="flex gap-2 w-full md:w-auto mb-3 md:mb-0">
            <DefaultButton v-if="showCreateListItemButton" @click="createListItem" :text="getCreateButtonText" icon="plusLg"
                variant="success" :loading="createListItemRequesting" />
        </div>
        <!-- /buttons -->

        <!-- filter -->
        <div v-if="listActions?.filter?.action" class="md:ml-auto flex w-full md:w-auto">
            <form class="w-full" @submit.prevent="filterList">
                <div class="flex gap-1">
                    <InputGroupForm placeholder="Pesquisar por..." v-model="filterForm.search" />
                    <DefaultButton type="submit" icon="search" text="" />
                </div>
            </form>
        </div>
        <!-- /filter -->
    </div>

    <div>
        <div v-if="filteredList ? filteredList.length === 0 : listItems.length === 0" class="text-xl text-center py-6">
            Nada para mostrar
        </div>
        <ListItem @deleteItem="deleteListItem" v-for="item, index in (filteredList ?? listItems)" :key="index" :item="item"
            :index="parseInt(index)" :showActionButtons="itemActions.show" :delete-action="{
                ...itemActions?.delete,
                action: itemActions?.delete?.action ? itemActions?.delete?.action.replace(':id', item.id) : null
            }" :edit-action="{
    ...itemActions?.edit,
    action: itemActions?.edit?.action ? itemActions.edit.action.replace(':id', item.id) : null,
    to: itemActions?.edit?.to ? {
        name: itemActions.edit.to.name,
        params: {
            id: item.id
        }
    } : null
}">
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
    emits: { createListItem: null, 'update:items': null },
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
                    method: 'get',
                    search_in: []
                },
                buttons: {
                    create: {
                        text: 'Novo',
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
            filteredList: null,
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
            let filter = this.listActions?.filter;

            if (!this.filterForm.search || !filter?.search_in) {
                this.filteredList = null
                return;
            }

            this.filteredList = this.listItems.filter(item => {
                let flag = false;

                filter.search_in.map(field => {
                    if (item[field] ?? null) {
                        if (item[field].includes(this.filterForm.search)) {
                            flag = true;
                        }
                    }
                });

                return flag;
            });
        }
    },
    computed: {
        showCreateListItemButton() {
            let createButton = this.listActions?.buttons?.create;

            return !createButton ? false : (createButton.to || createButton.url || createButton.action || createButton.callback);
        },
        getCreateButtonText() {
            return this.listActions?.buttons?.create?.text ?? 'Novo';
        }
    },
}

</script>

<style lang="css" scoped></style>