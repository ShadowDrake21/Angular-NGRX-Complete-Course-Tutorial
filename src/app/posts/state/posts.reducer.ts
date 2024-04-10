import { createReducer, on } from '@ngrx/store';
import { initialState, postsAdapter } from './posts.state';
import {
  addPostsSuccess,
  deletePost,
  deletePostSuccess,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.actions';
import { Post } from '../../models/posts.model';

const _postReducer = createReducer(
  initialState,
  on(addPostsSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, {
      ...state,
      count: state.count + 1,
    });
  }),
  on(updatePostSuccess, (state: any, action: any) => {
    return postsAdapter.updateOne(action.post, state);
  }),
  on(deletePostSuccess, (state: any, { id }) => {
    return postsAdapter.removeOne(id, state);
  }),
  on(loadPostsSuccess, (state, action) => {
    return postsAdapter.setAll(action.posts, {
      ...state,
      count: state.count + 1,
    });
  })
);

export function postsReducer(state: any, action: any) {
  return _postReducer(state, action);
}
