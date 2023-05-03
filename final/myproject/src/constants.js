export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
};

export const USER_TYPE = {
    NONE: 'none',
    USER: 'user',
    ADMIN: 'admin',
}

export const SHOW_PAGE = {
    CART: 'cart',
    MAIN: 'main',
    ADMIN: 'admin',
}

// Might be SERVER_CODES and CLIENT_CODES if we had more and different constants
export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_TASK: 'required-task',
    TASK_MISSING: 'noSuchId', // Someone was inconsistent!
};

export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
};

export const ACTIONS = {
    USER_LOG_IN: "userLogIn",
    UPDATE_USER_DATA: "updateUserData",
    LOG_OUT: 'logOut',
    UPDATE_CATS: 'updateCats',
    UPDATE_CART: 'updateCart',
    UPDATE_CART_TOTALPRICE: 'updateCartTotalPrice',
    UPDATE_ADDRESS_CARD: 'updateAddressCard',
    REPORT_ERROR: 'reportError',
    SHOW_CART: 'showCart',
    SHOW_ADMIN: 'showAdmin',
    SHOW_MAIN: 'showMain',
}
