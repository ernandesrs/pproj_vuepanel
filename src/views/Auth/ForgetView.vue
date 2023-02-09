<template>
    <div>
        AUTH FORGET
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    },

    created() {
        this.$store.commit("pageTitle", "Esquecia a senha");
        this.$store.commit("pageIcon", "bi bi-shield-lock");
    },
}
</script>

<style lang="scss" scoped>

</style>