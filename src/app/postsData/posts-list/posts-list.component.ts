import { Component, inject, OnInit } from '@angular/core';
import { PostDataService } from '../../services/post-data.service';
import { PostDataUrlService } from '../posts-data-url.service';
import { EntityDataService } from '@ngrx/data';
import { Observable } from 'rxjs';
import { Post } from '../../models/posts.model';
import { CommonModule } from '@angular/common';
import { PostsResolver } from '../posts.resolver';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [PostDataUrlService],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent implements OnInit {
  private postService = inject(PostDataService);

  posts$!: Observable<Post[]>;

  ngOnInit(): void {
    this.posts$ = this.postService.getAll();
  }

  constructor(
    entityDataService: EntityDataService,
    PostsDataService: PostDataUrlService
  ) {
    entityDataService.registerService('Post', PostsDataService);
  }

  onDeletePost(event: Event, id: string | undefined) {
    if (confirm('Are you sure you want to delete the post?')) {
      if (id) this.postService.delete(id);
    }
  }
}
