<template>
    <div
        :class="['custom-input-group', focused ? 'custom-input-group-focused' : '', errorMessage ? 'custom-input-group-invalid' : '']">
        <LabelForm :for="attrs?.id" :text="label"
            :class="['custom-label', focused ? 'custom-label-focused' : 'custom-label-not-focused']" />
        <InputForm @focusin="inputFocusIn" @focusout="inputFocusOut"
            :class="['custom-input', focused ? 'custom-input-focused' : '']" v-model="value"
            v-bind="{
                ...attrs,
                placeholder: placeholder
            }" :options="options" />
    </div>
    <small v-if="errorMessage" class="text-red-600" v-html="errorMessage"></small>
</template>

<script>

import InputForm from './InputForm.vue';
import LabelForm from './LabelForm.vue';

export default {
    components: { LabelForm, InputForm },
    props: {
        attrs: {
            type: Object,
            default: {}
        },
        label: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        modelValue: {
            type: String,
            default: null
        },
        errorMessage: {
            type: String,
            default: null
        },
        options: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            focused: this.modelValue?.length > 0 ? true : false,
            value: this.modelValue
        }
    },
    watch: {
        value(nv) {
            this.$emit('update:modelValue', nv);
        }
    },
    methods: {
        inputFocusIn() {
            this.focused = true;
        },
        inputFocusOut() {
            if (!(this.value?.length > 0))
                this.focused = false;
        }
    },
}
</script>

<style lang="css" scoped>
.custom-input-group {
    @apply flex flex-col justify-center bg-gray-100 border border-gray-400 py-1 px-4 rounded text-gray-600;
}

.custom-input-group-focused {
    @apply bg-gray-50;
}

.custom-input-group-invalid {
    @apply border-red-600;
}

.custom-input-group-invalid .custom-label {
    @apply text-red-600;
}

.custom-label {
    @apply relative z-0 duration-100 text-sm;
}

.custom-label-focused {
    @apply text-gray-500;
    transform: translateY(100%/5);
}

.custom-label-not-focused {
    @apply translate-y-1/2;
}

.custom-input {
    @apply relative z-10 w-full bg-transparent focus:outline-none;
}

.custom-input-focused {
    @apply translate-y-0;
}
</style>