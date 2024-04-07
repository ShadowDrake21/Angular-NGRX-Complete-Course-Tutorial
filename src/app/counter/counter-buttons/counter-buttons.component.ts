import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { decrement, increment, reset } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-buttons',
  standalone: true,
  imports: [],
  templateUrl: './counter-buttons.component.html',
  styleUrl: './counter-buttons.component.scss',
})
export class CounterButtonsComponent {
  private store = inject(Store<{ counter: CounterState }>);

  onIncrement() {
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }
}
