import { inject, Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Post } from '../models/posts.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpOptions } from '@ngrx/data/src/dataservices/interfaces';
import { Update } from '@ngrx/entity';

@Injectable()
export class PostDataUrlService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httoUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httoUrlGenerator);
  }

  override getAll(): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        `https://angular-ngrx-app-tutorial-default-rtdb.europe-west1.firebasedatabase.app/posts.json`
      )
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({
              ...data[key],
              id: key,
            });
          }
          return posts;
        })
      );
  }

  override add(post: Post): Observable<Post> {
    return this.http
      .post<{ name: string }>(
        `https://angular-ngrx-app-tutorial-default-rtdb.europe-west1.firebasedatabase.app/posts.json`,
        post
      )
      .pipe(
        map((data) => {
          return { ...post, id: data.name };
        })
      );
  }

  override update(post: Update<Post>): Observable<Post> {
    return this.http.put<Post>(
      `https://angular-ngrx-app-tutorial-default-rtdb.europe-west1.firebasedatabase.app/posts/${post.id}.json`,
      { ...post.changes }
    );
  }

  override delete(id: string): Observable<string> {
    return this.http
      .delete(
        `https://angular-ngrx-app-tutorial-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`
      )
      .pipe(
        map((data) => {
          return id;
        })
      );
  }
}
