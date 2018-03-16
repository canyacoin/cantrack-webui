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

}
