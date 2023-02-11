import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            auth: {
                user: null
            },
            page: {
                icon: null,
                title: null,
                subtitle: null,
            }
        }
    },
    mutations: {
        addAuthUser(state, user) {
            state.auth.user = user;
        },
        pageIcon(state, icon) {
            state.page.icon = icon;
        },
        pageTitle(state, title) {
            state.page.title = title;
        },
        pageSubtitle(state, subtitle) {
            state.page.subtitle = subtitle;
        },
    },
    getters: {
        authUser: state => {
            return state.auth.user;
        }
    }
})

export default store;