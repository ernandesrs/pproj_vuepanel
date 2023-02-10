<template>
    <label :for="labelFor" v-html="text"></label>
</template>

<script>
export default {
    props: {
        for: {
            type: String,
            default: null
        },
        text: {
            type: String,
            default: null
        },
    },

    computed: {
        labelFor() {
            return this.for;
        }
    },
}
</script>

<style lang="scss" scoped>

</style>