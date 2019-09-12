import { SUCCESS_GET_ALL_THOUGHTS, LOADING_UI, CLEAR_ERRORS, SET_ERRORS } from "../types";
import thoughtsAPI from '../../api/thoughts'

export const getAllThoughts = () => async dispatch => {
  dispatch({ type: LOADING_UI })
  const response = await thoughtsAPI.getAllThoughts();

  if (response.status === 200) {
    const { data: { data } } = response;
    dispatch({ type: SUCCESS_GET_ALL_THOUGHTS, payload: data })
    dispatch({ type: CLEAR_ERRORS })
  } else {
    dispatch({type: SET_ERRORS, payload: response.response.data.errors})
  }
}