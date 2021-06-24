const initialState = {
    isAuthenticated: false,
    user: null,
    token: {
        access: localStorage.getItem('access'),
        refresh: localStorage.getItem('refresh'),
    },
    isLoading: false,
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'USER_LOADED':
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case 'USER_FAIL':
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                token: {
                    access: null,
                    refresh: null
                },
                isAuthenticated: false,
                user: null,
                isLoading: false,
            }
        case 'USER_LOGGED_IN':
            localStorage.setItem('access', action.payload.token.access);
            localStorage.setItem('refresh', action.payload.token.refresh);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false,
            }
        case 'USER_LOGGED_OUT':
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            }
        default:
            return state;
    }
}

export default authReducer;