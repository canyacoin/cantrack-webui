import { Component, OnInit, Input } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-timer-trigger',
  templateUrl: './timer-trigger.component.html',
  styleUrls: ['./timer-trigger.component.css']
})
export class TimerTriggerComponent implements OnInit {

  @Input() size: string;
  @Input() timer: any;

  constructor(public globalTimer: TimerService) { }

  ngOnInit() {
  }

  play(timer) {
    this.globalTimer.stopLocalTimers();
    if (timer.counter.isLocalTimer) {
      this.globalTimer
        .onTimerStop()
        .onTimerStart();
    }
    timer.onTimerStart();
  }

  stop(timer) {
    this.globalTimer.stopLocalTimers();
    if (timer.counter.isLocalTimer) {
      this.globalTimer.onTimerStop();
    }
    timer.onTimerStop();
  }

}
