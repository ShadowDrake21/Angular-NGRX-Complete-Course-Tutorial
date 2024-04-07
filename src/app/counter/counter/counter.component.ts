import { Component } from '@angular/core';
import { CounterButtonsComponent } from '../counter-buttons/counter-buttons.component';
import { CounterOutputComponent } from '../counter-output/counter-output.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CounterOutputComponent, CounterButtonsComponent],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  counter: number = 0;

  onIncrement() {
    this.counter++;
  }

  onDecrement() {
    this.counter--;
  }

  onReset() {
    this.counter = 0;
  }
}
