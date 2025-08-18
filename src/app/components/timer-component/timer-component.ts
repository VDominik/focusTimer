import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timer-component',
  imports: [FormsModule],
  templateUrl: './timer-component.html',
  styleUrl: './timer-component.scss',
})
export class TimerComponent {
  focusTime = signal<number>(0);
  customFocusTime = signal<number | null>(null);
  workTitle = signal<string>('');

  constructor(private router: Router) {}

  startFocusSession() {
    const finalFocusTime = this.customFocusTime() || this.focusTime();

    // Navigate to countdown page with state data
    this.router.navigate(['/countdown'], {
      state: {
        workTitle: this.workTitle(),
        focusTime: finalFocusTime,
      },
    });
  }

  buttonClick(time: number) {
    this.customFocusTime.set(null);
    this.focusTime.set(time);
  }
}
