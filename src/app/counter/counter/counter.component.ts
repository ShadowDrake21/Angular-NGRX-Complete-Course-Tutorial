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
export class CounterComponent {}
