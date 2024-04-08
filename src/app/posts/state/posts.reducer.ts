import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';
import { addPost, deletePost, updatePost } from './posts.actions';
import { Post } from '../../models/posts.model';

const _postReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    let post = { ...action.post };

    post.id = (state.posts.length + 1).toString();
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePost, (state: any, action: any) => {
    const updatedPosts = state.posts.map((post: Post) => {
      return action.post.id === post.id ? action.post : post;
    });
    return { ...state, posts: updatedPosts };
  }),
  on(deletePost, (state: any, { id }) => {
    const updatedPosts = state.posts.filter((post: Post) => {
      return post.id !== id;
    });
    return {
      ...state,
      posts: updatedPosts,
    };
  })
);

export function postsReducer(state: any, action: any) {
  return _postReducer(state, action);
}
