<template>
    <div>
        AUTH LOGIN
    </div>
</template>

<script>
export default {
    created() {
        this.$store.commit("pageIcon", "bi bi-box-arrow-in-right");
        this.$store.commit("pageTitle", "Acessar conta");
    }
}
</script>

<style lang="scss" scoped>

</style>