import {
  SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED
} from "../types";

import userAPI from '../../api/user';

export const userSignin = (data, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI })
  // return history.push('/home');
  const response = await userAPI.signinUser(data);
  if (response.status === 200) {
    const { data: { token, ...user } } = response;

    dispatch({ type: SET_USER, payload: user })
    dispatch({ type: CLEAR_ERRORS });
    history.push('/home');
  } else {
    dispatch({ type: SET_ERRORS, payload: response.response.data.errors })
  }
}

export const userSignout = () => dispatch => {
  localStorage.removeItem('FBIdToken');
  dispatch({ type: SET_UNAUTHENTICATED })
}