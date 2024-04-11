import { Routes } from '@angular/router';

import { HomeDataComponent } from './home-data/home-data.component';
import { PostsListComponent } from './postsData/posts-list/posts-list.component';
import { AddPostComponent } from './postsData/add-post/add-post.component';
import { SinglePostComponent } from './postsData/single-post/single-post.component';
import { EditPostComponent } from './postsData/edit-post/edit-post.component';
import { PostsResolver } from './postsData/posts.resolver';

export const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent,
  // },
  // {
  //   path: 'auth',
  //   children: [
  //     {
  //       path: 'login',
  //       loadComponent: () =>
  //         import('./auth/login/login.component').then((m) => m.LoginComponent),
  //     },
  //     {
  //       path: 'signup',
  //       loadComponent: () =>
  //         import('./auth/signup/signup.component').then(
  //           (m) => m.SignupComponent
  //         ),
  //     },
  //   ],
  //   providers: [importProvidersFrom(EffectsModule.forFeature([]))],
  // },
  // {
  //   path: 'counter',
  //   loadComponent: () =>
  //     import('./counter/counter/counter.component').then(
  //       (m) => m.CounterComponent
  //     ),
  //   providers: [
  //     importProvidersFrom(
  //       StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer)
  //     ),
  //   ],
  // },
  // {
  //   path: 'posts',
  //   loadComponent: () =>
  //     import('./posts/posts-list/posts-list.component').then(
  //       (m) => m.PostsListComponent
  //     ),
  //   children: [
  //     { path: 'add', component: AddPostComponent },
  //     { path: 'edit/:id', component: EditPostComponent },
  //   ],
  //   canActivate: [authGuard],
  //   providers: [
  //     importProvidersFrom(
  //       StoreModule.forFeature(POST_STATE_NAME, postsReducer),
  //       EffectsModule.forFeature([PostsEffects])
  //     ),
  //   ],
  // },
  // { path: 'posts/details/:id', component: SinglePostComponent },
  { path: '', component: HomeDataComponent },
  {
    path: 'posts',
    component: PostsListComponent,
    resolve: { posts: PostsResolver },
  },
  { path: 'posts/add', component: AddPostComponent },
  {
    path: 'posts/edit/:id',
    component: EditPostComponent,
    resolve: { posts: PostsResolver },
  },
  {
    path: 'posts/details/:id',
    component: SinglePostComponent,
    resolve: { posts: PostsResolver },
  },
];
