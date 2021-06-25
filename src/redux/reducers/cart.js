const initialState = {
    order: null,
    isLoading: false,
    quantityLoading: {
        isLoading: false,
        id: null
    },
    deletingLoading: {
        isLoading: false,
        id: null
    },
    count: 0
}


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CART_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'SET_CART_COUNT':
            return {
                ...state,
                count: action.payload.cart_count
            }
        case 'INCREASE_CART_COUNT':
            return {
                ...state,
                count: action.payload
            }
        case 'DECREASE_CART_COUNT':
            state = {...state}
            state.count--
            return state
        case 'CART_SUCCESS':
            return {
                ...state,
                order: action.payload,
                isLoading: false
            }
        case 'CART_FAIL':
            return {
                ...state,
                order: null,
                isLoading: false
            }
        case 'QUANTITY_LOADING':
            return {
                ...state,
                quantityLoading: {
                    isLoading: true,
                    id: action.payload
                }
            }
        case 'INCREASE_SUCCESS':
            state = {...state};
            state.order[0].order_items[action.payload.index].quantity++;
            state.order[0].order_items[action.payload.index].get_total_price = action.payload.getTotalPrice;
            state.order[0].get_total_price = action.payload.getTotalOrderPrice;
            state.order[0].get_total_fianl_price = action.payload.getTotalFinalPrice;
            state.order[0].get_final_amount = action.payload.getFinalAmount;
            state.quantityLoading.isLoading = false;
            state.quantityLoading.id = null;
            return state;
        case 'DECREASE_SUCCESS':
            state = {...state};
            state.order[0].order_items[action.payload.index].quantity--;
            state.order[0].order_items[action.payload.index].get_total_price = action.payload.getTotalPrice;
            state.order[0].get_total_price = action.payload.getTotalOrderPrice;
            state.order[0].get_total_fianl_price = action.payload.getTotalFinalPrice;
            state.order[0].get_final_amount = action.payload.getFinalAmount;
            state.quantityLoading.isLoading = false;
            state.quantityLoading.id = null;
            return state;
        case 'INCREASE_FAIL':
        case 'DECREASE_FAIL':
            return {
                ...state,
                quantityLoading: {
                    isLoading: false,
                    id: null
                }
            };
        case 'DELETING_LOADING':
            return {
                ...state,
                deletingLoading: {
                    isLoading: true,
                    id: action.payload
                }
            }
        case 'DELETING_SUCCESS':
            let newOrderItems = state.order[0].order_items.filter((obj) => obj.id !== action.payload.id);
            state = {...state};
            state.order[0].order_items = newOrderItems;
            state.order[0].get_total_price = action.payload.getTotalOrderPrice;
            state.order[0].get_total_fianl_price = action.payload.getTotalFinalPrice;
            state.order[0].get_final_amount = action.payload.getFinalAmount;
            state.deletingLoading.isLoading = false;
            state.deletingLoading.id = null;
            state.count--;
            return state;
        case 'DELETING_FAIL':
            return {
                ...state,
                deletingLoading: {
                    isLoading: false,
                    id: null
                }
            };
        case 'RESET_CART':
            return {
                order: null,
                isLoading: false,
                quantityLoading: {
                    isLoading: false,
                    id: null
                },
                deletingLoading: {
                    isLoading: false,
                    id: null
                }
            }
        default:
            return state;
    }
}

export default cartReducer;