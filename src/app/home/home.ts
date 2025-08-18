import { Component } from '@angular/core';
import { TimerComponent } from '../components/timer-component/timer-component';

@Component({
  selector: 'app-home',
  imports: [TimerComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
