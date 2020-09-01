export const types = {
  REQUEST_POSTS: 'REQUEST_POSTS',
  RECEIVE_POSTS: 'RECEIVE_POSTS',
  SELECT_REDDIT: 'SELECT_REDDIT',
  REFRESH_REDDIT: 'REFRESH_REDDIT',
}

export const selectReddit = (reddit) => {
  return {
    type: types.SELECT_REDDIT,
    payload: reddit,
  }
}

export const refreshReddit = (reddit) => {
  return {
    type: types.REFRESH_REDDIT,
    payload: reddit,
  }
}
