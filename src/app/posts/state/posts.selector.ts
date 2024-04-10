import { createFeatureSelector, createSelector } from '@ngrx/store';
import { postsAdapter, PostsState } from './posts.state';
import { Post } from '../../models/posts.model';
import { getCurrentRoute } from '../../store/router/router.selector';
import { RouterStateUrl } from '../../store/router/custom-serializer';

export const POST_STATE_NAME = 'posts';
const getPostState = createFeatureSelector<PostsState>(POST_STATE_NAME);
export const postsSelectors = postsAdapter.getSelectors();

export const getPosts = createSelector(getPostState, postsSelectors.selectAll);
export const getPostEntities = createSelector(
  getPostState,
  postsSelectors.selectEntities
);

export const getPostById = createSelector(
  getPostEntities,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null;
  }
);

export const getCount = createSelector(getPostState, (state) => state.count);
