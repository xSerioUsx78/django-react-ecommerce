import axios from '../../axios/axios';
import requests from '../../requests/requests';

export const fetchCart = () => (dispatch, getState) => {
    const auth = getState().auth;
    if (auth.isAuthenticated) {
        dispatch({
            type: 'CART_LOADING'
        });
        const config = {
            headers: {
                'Authorization': `Bearer ${auth.token.access}`
            }
        }
        axios
            .get(requests.fetchCartURL, config)
            .then(
                res => {
                    dispatch({
                        type: 'CART_SUCCESS',
                        payload: res.data
                    });
                }
            )
            .catch(e => {
                console.log(e)
                dispatch({
                    type: 'CART_FAIL'
                });
            });
    }
};

export const increaseItem = (id, index) => (dispatch, getState) => {
    const auth = getState().auth;
    dispatch({
        type: 'QUANTITY_LOADING',
        payload: id
    });
    const config = {
        headers: {
            'Authorization': `Bearer ${auth.token.access}`
        }
    };
    const data = {
        pk: id
    };
    axios
        .post(requests.increaseQuantityURL, data, config)
        .then(
            res => {
                dispatch({
                    type: 'INCREASE_SUCCESS',
                    payload: {
                        getTotalPrice: res.data.get_total_price,
                        getTotalOrderPrice: res.data.get_total_order_price,
                        getTotalFinalPrice: res.data.get_total_fianl_price,
                        getFinalAmount: res.data.get_final_amount,
                        index: index
                    }
                });
            }
        )
        .catch(e => {
            console.log(e);
            dispatch({
                type: 'INCREASE_FAIL'
            });
        });
};

export const decreaseItem = (id, index) => (dispatch, getState) => {
    const auth = getState().auth;
    dispatch({
        type: 'QUANTITY_LOADING',
        payload: id
    });
    const config = {
        headers: {
            'Authorization': `Bearer ${auth.token.access}`
        }
    };
    const data = {
        pk: id
    };
    axios
        .post(requests.decreaseQuantityURL, data, config)
        .then(
            res => {
                dispatch({
                    type: 'DECREASE_SUCCESS',
                    payload: {
                        getTotalPrice: res.data.get_total_price,
                        getTotalOrderPrice: res.data.get_total_order_price,
                        getTotalFinalPrice: res.data.get_total_fianl_price,
                        getFinalAmount: res.data.get_final_amount,
                        index: index
                    }
                });
            }
        )
        .catch(e => {
            dispatch({
                type: 'DECREASE_FAIL'
            });
        });
};

export const deleteItem = (id) => (dispatch, getState) => {
    const auth = getState().auth;
    dispatch({
        type: 'DELETING_LOADING',
        payload: id
    });
    const config = {
        headers: {
            'Authorization': `Bearer ${auth.token.access}`
        }
    };
    const data = {
        pk: id
    };
    axios
        .post(requests.removeFromCartURL, data, config)
        .then(
            res => {
                dispatch({
                    type: 'DELETING_SUCCESS',
                    payload: {
                        getTotalOrderPrice: res.data.get_total_order_price,
                        getTotalFinalPrice: res.data.get_total_fianl_price,
                        getFinalAmount: res.data.get_final_amount,
                        id: id
                    }
                });
            }
        )
        .catch(e => {
            dispatch({
                type: 'DELETING_FAIL'
            });
        });
};