<template>
    <div>
        <ListItem @deleteItem="deleteListItem" v-for="item, index in listItems" :key="item"
            :item="item" :index="parseInt(index)" :deleteAction="{
                show: this.actions.delete.show,
                action: this.actions.delete.action ? this.actions.delete.action.replace(':' + this.actions.delete.bindWith, item[this.actions.delete.bindWith]) : '',
                method: this.actions.delete.method
            }">
            <slot name="listItemContent" v-bind="{ item: item, index: index }" />
        </ListItem>
    </div>
</template>

<script>

import ListItem from './ListItem.vue';

export default {
    components: { ListItem, },
    props: {
        items: {
            type: [Array],
            default: []
        },
        actions: {
            delete: {
                type: Object,
                default: {
                    show: false,
                    action: null,
                    bindWith: 'id',
                    method: 'delete'
                }
            }
        }
    },
    data() {
        return {
            listItems: this.items
        }
    },
    watch: {
        listItems: {
            deep: true,
            handler(newValue, oldValue) {
                if (oldValue) {
                    this.$emit('update:items');
                }
            }
        }
    },
    methods: {
        deleteListItem(item) {
            this.listItems.splice(item, 1);
        }
    }
}

</script>

<style lang="css" scoped></style>