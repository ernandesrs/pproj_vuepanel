<template>
    <div>
        {{ $store.state.page.title }}
    </div>
    <div>
        <RouterView />
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>