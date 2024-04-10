import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../../services/posts.service';
import {
  addPost,
  addPostsSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.actions';
import { filter, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import {
  ROUTER_NAVIGATION,
  RouterNavigatedAction,
  RouterNavigationAction,
  routerNavigationAction,
  SerializedRouterStateSnapshot,
} from '@ngrx/router-store';
import { Update } from '@ngrx/entity';
import { Post } from '../../models/posts.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getPosts } from './posts.selector';
import { dummyAction } from '../../auth/state/auth.actions';

@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);
  private postsService = inject(PostsService);
  private store = inject(Store<AppState>);

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(([action, posts]) => {
        if (!posts.length || posts.length === 1) {
          return this.postsService.getPosts().pipe(
            map((posts) => {
              return loadPostsSuccess({ posts });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addPostsSuccess({ post });
          })
        );
      })
    );
  });

  updatePosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            const updatedPost: Update<Post> = {
              id: action.post.id ?? '',
              changes: {
                ...action.post,
              },
            };
            return updatePostSuccess({ post: updatedPost });
          })
        );
      })
    );
  });

  deletePosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });

  getSinglePost = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: RouterNavigatedAction) => {
        const snapshot: SerializedRouterStateSnapshot = r.payload.routerState;
        const params = (snapshot as any).params;
        return params['id'];
      }),
      withLatestFrom(this.store.select(getPosts)),
      switchMap(([id, posts]) => {
        if (!posts.length) {
          return this.postsService.getPostById(id).pipe(
            map((post) => {
              const postData = [{ ...post, id }];
              return loadPostsSuccess({ posts: postData });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });
}
