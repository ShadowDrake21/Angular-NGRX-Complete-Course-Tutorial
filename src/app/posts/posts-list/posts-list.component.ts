import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AppState } from '../../store/app.state';
import { Post } from '../../models/posts.model';
import { getPosts } from '../state/posts.selector';
import { RouterModule } from '@angular/router';
import { deletePost, loadPosts } from '../state/posts.actions';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent implements OnInit {
  private store = inject(Store<AppState>);

  posts$!: Observable<Post[]>;

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }

  onDeletePost(id: string | undefined) {
    if (id) {
      if (confirm('Are you sure you want to delete?')) {
        this.store.dispatch(deletePost({ id }));
      }
    }
  }
}
