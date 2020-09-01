import {types} from '../actions';
import { take, put, call, fork, select } from 'redux-saga/effects';
import { selectedRedditSelector, postsByRedditSelector } from '../reducers/selectors';

// Helper actions for fetchPostsSaga
const requestPosts = (reddit) => {
  return {
    type: types.REQUEST_POSTS,
    payload: reddit,
  }
}

const receivePosts = (reddit, posts) => {
  return {
    type: types.RECEIVE_POSTS,
    payload: {
      reddit,
      posts,
      receivedAt: new Date().setMilliseconds(0),
    }
  }
}

// Utils for fetchPosts saga
const fetchPostsApi = (reddit) => {
  return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(res => res.json())
    .then(json => json.data.children.map(child => child.data));
}

// Sagas
function* fetchPostsSaga(reddit) {
  yield put(requestPosts(reddit));
  const posts = yield call(fetchPostsApi, reddit);
  yield put(receivePosts(reddit, posts));
}

function* startupSaga() {
  const selectedReddit = yield select(selectedRedditSelector);
  yield fork(fetchPostsSaga, selectedReddit);
}

function* selectRedditSaga() {
  while (true) {
    const prevReddit = yield select(selectedRedditSelector);
    yield take(types.SELECT_REDDIT);

    const newReddit = yield select(selectedRedditSelector);
    const postsByReddit = yield select(postsByRedditSelector);
    if (prevReddit !== newReddit && !postsByReddit[newReddit]) {
      yield fork(fetchPostsSaga, newReddit);
    };
  }
}

function* refreshRedditSaga() {
  while (true) {
    const { payload } = yield take(types.REFRESH_REDDIT);
    yield call(fetchPostsSaga, payload);
  }
}


export default function* root() {
  yield fork(startupSaga);
  yield fork(selectRedditSaga);
  yield fork(refreshRedditSaga);
}
