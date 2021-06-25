import axios from '../../axios/axios';
import requests from '../../requests/requests';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: 'USER_LOADING' });
  const access = getState().auth.token.access;
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  if (access) {
    config.headers['Authorization'] = `Bearer ${access}`;
    axios
      .get(requests.getUserURL, config)
      .then(res => {
        dispatch({
          type: 'USER_LOADED',
          payload: res.data
        });
        dispatch({
          type: "SET_CART_COUNT",
          payload: {
            "cart_count": res.data.cart_count
          }
        })
      })
      .catch(err => {
        dispatch({
          type: 'USER_FAIL'
        });
      });
  } else {
    dispatch({
      type: 'USER_FAIL'
    });
  }
};


export const loginUser = (data) => (dispatch) => {
  dispatch({ type: 'USER_LOADING' });
  dispatch({ type: 'IS_LOADING' });
  axios
    .post(requests.loginURL, data)
    .then(res => {
      const token = {
        'access': res.data.access,
        'refresh': res.data.refresh
      };
      const user = res.data.user;
      const cartCount = res.data.cart_count;
      dispatch({
        type: 'USER_LOGGED_IN',
        payload: {
          'token': token,
          'user': user
        },
      });
      dispatch({ type: 'RESET_ERROR' });
      dispatch({ type: 'NOT_LOADING' });
      dispatch({
        type: 'SET_CART_COUNT',
        payload: {
          "cart_count": cartCount
        },
      });
    })
    .catch(err => {
      dispatch({
        type: 'USER_FAIL'
      });
      dispatch({
        type: 'SET_ERROR',
        payload: {
          msg: err.response.data.detail,
          status: err.response.status
        }
      });
      dispatch({ type: 'NOT_LOADING' });
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: 'IS_LOADING' });
  dispatch({
    type: 'USER_LOGGED_OUT'
  });
  dispatch({
    type: 'RESET_CART'
  })
  dispatch({ type: 'NOT_LOADING' });
};