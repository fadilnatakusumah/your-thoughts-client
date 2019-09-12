import { SUCCESS_GET_ALL_THOUGHTS } from "../types";


const initialState = {
  allThoughts: [],
  followingThoughts: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SUCCESS_GET_ALL_THOUGHTS:
      return {
        ...state,
        allThoughts: action.payload
      }
    default:
      return state;
  }
}