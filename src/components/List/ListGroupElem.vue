<template>
    <div class="flex items-center pb-6">
        <!-- buttons -->
        <div class="flex gap-2">
            <DefaultButton @click="newListItem" text="Novo" icon="bi bi-plus-lg"
                variant="success" />
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
            :item="item" :index="parseInt(index)" :showActionButtons="showActionButtons">
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
    props: {
        items: {
            type: [Array],
            default: []
        },
        showActionButtons: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            listItems: this.items,
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
        newListItem() {
            console.log('new list item');
        },
        deleteListItem(item) {
            this.listItems.splice(item, 1);
        },
        filterList() {
            console.log('filter list');
        }
    }
}

</script>

<style lang="css" scoped></style>