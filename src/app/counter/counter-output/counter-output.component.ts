import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { CounterState } from '../state/counter.state';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { getCounter } from '../state/counter.selectors';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-counter-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-output.component.html',
  styleUrl: './counter-output.component.scss',
})
export class CounterOutputComponent implements OnInit {
  private store = inject(Store<AppState>);
  counter$!: Observable<number>;

  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter);
  }
}
