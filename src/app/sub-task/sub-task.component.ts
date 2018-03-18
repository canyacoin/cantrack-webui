import { Component, OnInit, Input } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.css']
})
export class SubTaskComponent implements OnInit {

  @Input() localTimer: TimerService

  description: string

  time: number

  constructor(public globalTimer: TimerService) {
    this.localTimer = new TimerService;
    this.localTimer.counter.isLocalTimer = true;
    this.globalTimer.addLocalTimer(this.localTimer);
  }

  ngOnInit() {
  }

}
