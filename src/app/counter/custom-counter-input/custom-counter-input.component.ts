import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { customIncrement } from '../state/counter.actions';

@Component({
  selector: 'app-custom-counter-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-counter-input.component.html',
  styleUrl: './custom-counter-input.component.scss',
})
export class CustomCounterInputComponent {
  private store = inject(Store<{ counter: CounterState }>);
  value!: number;

  onAdd() {
    this.store.dispatch(customIncrement({ count: +this.value }));
  }
}
