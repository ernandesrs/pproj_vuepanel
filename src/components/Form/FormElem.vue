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
        }
    },
    data() {
        return {
            form: this.data
        }
    },
    methods: {
        submit() {
            this.form.submitting = true;

            this.$axios.request(this.action, this.data, this.method).then((resp) => {
                console.log(resp.response.data);
            }).catch((resp) => {
                let errors = resp.response.data?.errors ?? [];

                (Object.entries(errors)).map((error) => {
                    this.form.errors[error[0]] = error[1][0];
                });
            }).then(() => {
                this.form.submitting = false;
            });
        }
    },
}
</script>

<style lang="css" scoped>

</style>