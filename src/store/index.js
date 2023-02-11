import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            auth: {
                user: null
            },
            message: {
                variant: null,
                message: null,
                duration: 7.5,
                type: 'fixed'
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
        addMessage(state, message) {
            state.message = {
                ...state.message,
                ...message,
                time: (new Date()).getTime()
            };
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
        },
        message: state => {
            return state.message;
        },
    }
})

export default store;