import { Component, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountdownComponent } from '../components/countdown-component/countdown-component';

@Component({
  selector: 'app-countdown',
  imports: [CountdownComponent],
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss',
})
export class Countdown implements OnInit {
  workTitle = signal<string>('');
  focusTime = signal<number>(0);

  constructor(private router: Router) {
    // Get data from navigation state
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;

    if (state) {
      this.workTitle.set(state['workTitle'] || '');
      this.focusTime.set(state['focusTime'] || 0);
    }
  }

  ngOnInit() {
    // Redirect back if no data was passed
    if (!this.focusTime() || !this.workTitle()) {
      this.router.navigate(['/']);
    }
  }

  onTimerComplete() {
    // Navigate back to home when timer completes
    this.router.navigate(['/']);
  }
}
