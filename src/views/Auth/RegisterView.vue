<template>
    <div>
        AUTH REGISTER
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    },

    created() {
        this.$store.commit("pageTitle", "Criar uma conta");
        this.$store.commit("pageIcon", "bi bi-person-circle");
    }
}
</script>

<style lang="scss" scoped>

</style>