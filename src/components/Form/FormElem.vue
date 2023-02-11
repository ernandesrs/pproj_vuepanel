<template>
    <form @submit.prevent="submit">
        <slot />
    </form>
</template>

<script>
export default {
    props: {
        action: {
            type: String,
            default: null
        },
        method: {
            type: String,
            default: 'get'
        },
        data: {
            type: Object,
            default: {}
        },
        callbacks: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            form: this.data
        }
    },
    methods: {
        submit() {
            this.form.errors = {};
            this.form.submitting = true;

            this.$axios.request(this.action, this.data, this.method).then((resp) => {
                if (this.callbacks?.success)
                    this.callbacks.success(resp);
            }).catch((resp) => {
                let errors = resp.response.data?.errors ?? [];

                (Object.entries(errors)).map((error) => {
                    this.form.errors[error[0]] = error[1][0];
                });

                if (this.callbacks?.fail)
                    this.callbacks.fail(resp);
            }).then(() => {
                this.form.submitting = false;

                if (this.callbacks?.finnaly)
                    this.callbacks.finnaly(resp);
            });
        }
    },
}
</script>

<style lang="css" scoped>

</style>