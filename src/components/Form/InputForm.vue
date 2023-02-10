<template>
    <input :type="type" :disabled="disabled" :readonly="readonly" v-model="value" :id="id"
        :name="name" />
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            default: null
        },
        id: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: 'text'
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            value: this.modelValue
        }
    },
    watch: {
        value(nv) {
            this.$emit('update:modelValue', nv);
        }
    },
}
</script>

<style lang="css" scoped>

</style>