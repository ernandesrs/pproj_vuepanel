<template>
    <li :class="item.li_class">
        <NavLink :link="item" />
    </li>
</template>

<script>

import NavLink from './NavLink.vue';

export default {
    components: { NavLink },
    props: {
        item: {
            type: Object,
            default: {}
        },
    },
}

</script>