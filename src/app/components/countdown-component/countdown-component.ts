import { Component, input, output, signal, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countdown-component',
  imports: [],
  templateUrl: './countdown-component.html',
  styleUrl: './countdown-component.scss',
})
export class CountdownComponent implements OnInit, OnDestroy {
  workTitle = input<string>('');
  focusTime = input<number>(0);

  // Output for when timer completes
  timerComplete = output<void>();

  // Timer state
  timeRemaining = signal<number>(0); // in seconds
  isRunning = signal<boolean>(false);
  isPaused = signal<boolean>(false);

  private interval: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Convert focus time from minutes to seconds
    this.timeRemaining.set(this.focusTime() * 60);
    this.startTimer();
  }

  ngOnDestroy() {
    this.clearInterval();
  }

  startTimer() {
    if (this.timeRemaining() <= 0) return;

    this.isRunning.set(true);
    this.isPaused.set(false);

    this.interval = setInterval(() => {
      const current = this.timeRemaining();

      if (current <= 0) {
        this.completeTimer();
        return;
      }

      this.timeRemaining.set(current - 1);
    }, 1000);
  }

  pauseTimer() {
    this.isPaused.set(true);
    this.isRunning.set(false);
    this.clearInterval();
  }

  resetTimer() {
    this.router.navigate(['/']);
  }

  private completeTimer() {
    this.clearInterval();
    this.isRunning.set(false);
    this.isPaused.set(false);
    this.timeRemaining.set(0);
    this.timerComplete.emit();
  }

  private clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  // Helper method to format time as MM:SS
  get formattedTime(): string {
    const totalSeconds = this.timeRemaining();
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Helper method to calculate progress percentage
  progressPercentage(): number {
    const totalTime = this.focusTime() * 60; // total time in seconds
    const elapsed = totalTime - this.timeRemaining();
    return totalTime > 0 ? (elapsed / totalTime) * 100 : 0;
  }
}
