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
import { map, mergeMap, switchMap } from 'rxjs';

@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);
  private postsService = inject(PostsService);

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            return loadPostsSuccess({ posts });
          })
        );
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
            return updatePostSuccess({ post: action.post });
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
}
