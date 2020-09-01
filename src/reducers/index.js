import {types} from '../actions';
import { combineReducers } from 'redux';

const selectedReddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case types.SELECT_REDDIT:
      return action.payload
    default:
      return state
  }
}

// Helper reducer for postsByReddit
const posts = (
  state = {
    isFetching: false,
    items: [],
  },
  action,
) => {
  switch (action.type) {
    case types.REQUEST_POSTS:
      return { ...state, isFetching: true }

    case types.RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.payload.posts,
        lastUpdated: action.payload.receivedAt,
      }
    default:
      return state
  }
}

const postsByReddit = (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_POSTS:
      return {
        ...state,
        // posts is a helper reducer
        [action.payload]: posts(state[action.payload], action),
      }
    case types.RECEIVE_POSTS:
      return {
        ...state,
        [action.payload.reddit]: posts(state[action.payload.reddit], action),
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit,
});

export default rootReducer;
