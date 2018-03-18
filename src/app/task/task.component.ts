import { Component, OnInit, Input } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  @Input() localTimer: TimerService

  @Input() taskList: any

  description: string

  time: number

  subTasks = []

  constructor(public globalTimer: TimerService) {
    this.localTimer = new TimerService;
    this.localTimer.counter.isLocalTimer = true;
    this.globalTimer.addLocalTimer(this.localTimer);
  }

  ngOnInit() {
    console.log(this.taskList.tasks);
  }

  onEnter(e) {
    console.log(e);
  }

  onTab(e) {
    console.log(e);
  }

}
