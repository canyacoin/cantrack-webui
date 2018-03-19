import { Component, OnInit, Input } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.component.html',
  styleUrls: ['./sub-task.component.css']
})

export class SubTaskComponent implements OnInit {

  @Input() localTimer: TimerService

  parentTask: any;

  description: string

  time: number

  id: number

  constructor(public globalTimer: TimerService) {
    this.localTimer = new TimerService(true);
    this.localTimer.counter.isLocalTimer = true;
    this.globalTimer.addLocalTimer(this.localTimer);
  }

  ngOnInit() {
  }

  onEnter(e) {
    e.preventDefault();
    this.parentTask.createSubTask();
  }

  add() {
    this.parentTask.createSubTask();
  }

  remove() {
    this.parentTask.removeSubTask(this.id);
  }

}
