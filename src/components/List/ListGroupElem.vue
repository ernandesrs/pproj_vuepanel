<template>
    <div>
        <ListItem @deleteItem="deleteListItem" v-for="item, index in listItems" :key="item"
            :item="item" :index="parseInt(index)">
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
    },
}

</script>

<style lang="css" scoped></style>