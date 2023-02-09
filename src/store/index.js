import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            page: {
                title: null
            }
        }
    },
    mutations: {
        pageTitle(state, title) {
            state.page.title = title;
        }
    }
})

export default store;