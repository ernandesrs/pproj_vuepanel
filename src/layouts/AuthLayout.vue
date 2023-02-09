<template>
    <div class="wrap">
        <div class="wrap-box">
            <div>
                {{ $store.state.page.title }}
            </div>
            <RouterView />
        </div>
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style lang="css" scoped>
.wrap {
    @apply w-full min-h-screen bg-light-light flex items-center justify-center px-5;
}

.wrap-box {
    @apply w-full h-96 bg-white bg-opacity-5 py-4 px-5 shadow-xl rounded;

    @apply sm:max-w-[400px];
}
</style>