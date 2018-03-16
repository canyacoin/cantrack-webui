import { Component, OnInit, Input } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  @Input() localTimer: TimerService;

  constructor(public globalTimer: TimerService) {
    this.localTimer = new TimerService;
  }

  ngOnInit() {
  }

}
