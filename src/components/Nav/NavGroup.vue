<template>
    <ul class="flex" :class="{ 'flex-col': column }">
        <NavItem v-for="item, index in items" :key="index" :item="{
            ...item,
            a_hover_class: `duration-200 ease-in-out hover:ease-in hover:opacity-50 ` + (column ? 'hover:pl-5' : ''),
            a_active_class: `opacity-50 ` + (column ? 'pl-5' : ''),
        }" />
    </ul>
</template>

<script>

import NavItem from './NavItem.vue';

export default {
    components: { NavItem },
    props: {
        items: {
            type: Array,
            default: []
        },
        column: {
            type: Boolean,
            default: false
        }
    },
}

</script>
