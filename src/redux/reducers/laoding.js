const laodingReducer = (state=false, action) => {
    switch (action.type) {
        case 'IS_LOADING':
            return !state;
        case 'NOT_LOADING':
            return state=false;
        default:
            return state;
    }
}

export default laodingReducer;