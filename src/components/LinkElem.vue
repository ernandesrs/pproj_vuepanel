<template>
    <Component :is="tag" v-bind="props"
        class="inline-flex flex-wrap items-center justify-center">
        <template v-if="text || icon">
            <IconElem v-if="icon && !iconEnd" :icon="icon" />
            <span v-if="text" class="inline-block" :class="[icon ? (iconEnd ? 'mr-2' : 'ml-2') : '']">
                {{ text }}
            </span>
            <IconElem v-if="icon && iconEnd" :icon="icon" />
        </template>
        <slot />
    </Component>
</template>

<script>

import IconElem from './IconElem.vue';

export default {
    components: { IconElem },
    props: {
        url: {
            type: String,
            default: null
        },
        to: {
            type: Object,
            default: null
        },
        target: {
            type: String,
            default: "_self"
        },
        icon: {
            type: String,
            default: null,
        },
        iconEnd: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: "button"
        },
        title: {
            type: String,
            default: null
        },
        text: {
            type: String,
            default: null
        }
    },
    computed: {
        tag() {
            return this.to ? 'RouterLink' : this.url ? 'a' : 'button';
        },
        props() {
            let linkProps = {
                title: this.title ?? this.text,
                target: this.target
            };

            if (this.to) {
                linkProps = {
                    ...linkProps,
                    to: this.to
                };
            } else if (this.url) {
                linkProps = {
                    ...linkProps,
                    href: this.url
                };
            } else {
                linkProps = {
                    ...linkProps,
                    type: this.type
                }
            }

            return linkProps;
        }
    },
}

</script>

<style lang="css" scoped>
span {
    @apply pointer-events-none;
}
</style>