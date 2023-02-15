<template>
    <LinkElem @click="link?.clickEvent" class="w-full py-2 px-4 !justify-start"
        :class="[link.a_class, link.a_hover_class, ((link.activeIn ?? []).includes($route.name) ? link.a_active_class : null)]"
        :text="link.text" :icon="link.icon" :to="link.to" :url="link.url"
        :title="link.title" :target="link.target" />
</template>

<script>

import LinkElem from '../LinkElem.vue';

export default {
    components: { LinkElem },
    props: {
        link: {
            type: Object,
            default: {}
        },
    },
}

</script>
