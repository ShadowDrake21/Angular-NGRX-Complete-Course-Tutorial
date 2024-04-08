import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter/counter.component';
import { CounterOutputComponent } from './counter/counter-output/counter-output.component';
import { CounterButtonsComponent } from './counter/counter-buttons/counter-buttons.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { getErrorMessage, getLoading } from './store/Shared/shared.selector';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    CounterComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private store = inject(Store<AppState>);
  showLoading$!: Observable<boolean>;
  errorMessage!: Observable<string>;

  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
  }
}
