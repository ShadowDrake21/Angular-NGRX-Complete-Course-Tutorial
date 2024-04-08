import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter/state/counter.reducer';
import { postsReducer } from './posts/state/posts.reducer';
import { POST_STATE_NAME } from './posts/state/posts.selector';
import { COUNTER_STATE_NAME } from './counter/state/counter.selectors';
import { LoginComponent } from './auth/login/login.component';
import { AUTH_STATE_NAME } from './auth/state/auth.selector';
import { authReducer } from './auth/state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/state/auth.effects';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login.component').then((m) => m.LoginComponent),
      },
    ],
    providers: [importProvidersFrom(EffectsModule.forFeature([AuthEffects]))],
  },
  {
    path: 'counter',
    loadComponent: () =>
      import('./counter/counter/counter.component').then(
        (m) => m.CounterComponent
      ),
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer)
      ),
    ],
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./posts/posts-list/posts-list.component').then(
        (m) => m.PostsListComponent
      ),
    children: [
      { path: 'add', component: AddPostComponent },
      { path: 'edit/:id', component: EditPostComponent },
    ],

    providers: [
      importProvidersFrom(
        StoreModule.forFeature(POST_STATE_NAME, postsReducer)
      ),
    ],
  },
];
