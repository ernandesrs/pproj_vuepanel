import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            page: {
                icon: null,
                title: null,
                subtitle: null,
            }
        }
    },
    mutations: {
        pageIcon(state, icon) {
            state.page.icon = icon;
        },
        pageTitle(state, title) {
            state.page.title = title;
        },
        pageSubtitle(state, subtitle) {
            state.page.subtitle = subtitle;
        },
    }
})

export default store;