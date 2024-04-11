import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { PostDataUrlService } from './posts-data-url.service';
import { PostDataService } from '../services/post-data.service';
import { first, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class PostsResolver implements Resolve<boolean> {
  private postsService = inject(PostDataService);
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<boolean> {
    return this.postsService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.postsService.getAll();
        }
      }),
      first()
    );
  }
}
