import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/posts.model';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { getPostById } from '../state/posts.selector';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss',
})
export class SinglePostComponent implements OnInit {
  private store = inject(Store<AppState>);

  post$!: Observable<Post | undefined | null>;

  ngOnInit(): void {
    this.post$ = this.store.select(getPostById);
  }
}
