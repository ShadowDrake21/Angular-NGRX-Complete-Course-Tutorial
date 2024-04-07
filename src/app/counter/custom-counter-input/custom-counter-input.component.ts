import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { changeName, customIncrement } from '../state/counter.actions';
import { getName } from '../state/counter.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-custom-counter-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-counter-input.component.html',
  styleUrl: './custom-counter-input.component.scss',
})
export class CustomCounterInputComponent implements OnInit {
  private store = inject(Store<{ counter: CounterState }>);
  value!: number;
  name$!: Observable<string>;

  ngOnInit(): void {
    this.name$ = this.store.select(getName);
  }

  onAdd() {
    this.store.dispatch(customIncrement({ count: +this.value }));
  }

  onChangeName() {
    this.store.dispatch(changeName());
  }
}
