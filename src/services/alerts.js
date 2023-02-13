import store from '../store';
import messages from '../services/messages';

const FLASH_ALERT_KEY = 'flash_alert';

/**
 * Add
 * @param {Object} message object containing the message, variant(light, success, danger, info, warning), type(floating or fixed)
 * @param {Boolean} session indicates whether the message should be add the session to be displayed in the next view
 */
const add = (message, session = false) => {
    if (session) {
        sessionStorage.setItem(FLASH_ALERT_KEY, JSON.stringify({
            ...message
        }));
    } else {
        store.commit('addMessage', message);
    }
};

/**
 * Add Error
 * @param {String} errorName the name of the error to get a specific message defined in /services/messages
 * @param {String} session indicates whether the message should be add the session to be displayed in the next view
 */
const addError = (errorName, session = false) => {
    add({
        message: messages.get(errorName),
        variant: 'danger'
    }, session);
};

/**
 * Get a flash message from session and add on vuex store
 * @returns Boolean
 */
const flash = () => {
    if (!has()) return false;

    store.commit('addMessage', JSON.parse(sessionStorage.getItem(FLASH_ALERT_KEY)));
    sessionStorage.removeItem(FLASH_ALERT_KEY);

    return true;
};

/**
 * Check
 * @returns Boolean
 */
const has = () => {
    return sessionStorage.getItem(FLASH_ALERT_KEY) ? true : false;
};

export default {
    add: add,
    addError: addError,
    flash: flash,
    has: has
};