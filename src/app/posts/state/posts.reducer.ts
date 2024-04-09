import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';
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
    let post = { ...action.post };

    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePostSuccess, (state: any, action: any) => {
    const updatedPosts = state.posts.map((post: Post) => {
      return action.post.id === post.id ? action.post : post;
    });
    return { ...state, posts: updatedPosts };
  }),
  on(deletePostSuccess, (state: any, { id }) => {
    const updatedPosts = state.posts.filter((post: Post) => {
      return post.id !== id;
    });
    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    };
  })
);

export function postsReducer(state: any, action: any) {
  return _postReducer(state, action);
}
