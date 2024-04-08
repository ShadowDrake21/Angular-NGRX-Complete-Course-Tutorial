import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';
import { Post } from '../../models/posts.model';

const getPostState = createFeatureSelector<PostsState>('posts');

export const getPosts = createSelector(getPostState, (state) => {
  return state.posts;
});

export const getPostById = createSelector(
  getPostState,
  (state: any, props: any) => {
    return state.posts.find((post: Post) => post.id === props.id);
  }
);
