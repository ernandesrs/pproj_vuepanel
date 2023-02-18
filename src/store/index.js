import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            auth: {
                user: null
            },
            message: {
                variant: 'light',
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

        addPageData(state, data = {
            icon: null,
            title: null,
            subtitle: null
        }) {
            state.page = data;
        }
    },
    getters: {
        // auth user getters
        authUser: state => {
            return state.auth.user;
        },
        getAuthUser: state => {
            return state.auth.user;
        },

        // message getters
        getMessage: state => {
            return state.message;
        },

        // page getters
        getPageIcon: state => {
            return state.page.icon;
        },
        getPageTitle: state => {
            return state.page.title;
        },
        getPageSubtitle: state => {
            return state.page.subtitle;
        }
    }
})

export default store;