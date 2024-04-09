import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { isAuthenticated } from '../../../auth/state/auth.selector';
import { authoLogout } from '../../../auth/state/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private store = inject(Store<AppState>);

  isAuthenticated$!: Observable<boolean>;

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(authoLogout());
  }
}
