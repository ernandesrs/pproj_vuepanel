<template>
    <div>
        AUTH UPDATE PASSWORD
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    },

    created() {
        this.$store.commit("pageTitle", "Atualizar senha");
        this.$store.commit("pageIcon", "bi bi-check-circle");
    }
}
</script>

<style lang="scss" scoped>

</style>