import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../models/posts.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        `https://angular-ngrx-app-tutorial-default-rtdb.europe-west1.firebasedatabase.app/posts.json`
      )
      .pipe(
        map((data: any) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://angular-ngrx-app-tutorial-default-rtdb.europe-west1.firebasedatabase.app/posts.json`,
      post
    );
  }

  updatePost(post: Post) {
    let postData = {
      [post.id ?? uuidv4()]: {
        title: post.title,
        description: post.description,
      },
    };
    return this.http.patch(
      `https://angular-ngrx-app-tutorial-default-rtdb.europe-west1.firebasedatabase.app/posts.json`,
      postData
    );
  }

  deletePost(id: string) {
    return this.http.delete(
      `https://angular-ngrx-app-tutorial-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`
    );
  }
}
