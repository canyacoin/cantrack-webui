import { Component, OnInit } from '@angular/core';
import { IdleTaskService } from '../idle-task.service';
import * as moment from 'moment';

@Component({
  selector: 'app-idle-task-modal',
  templateUrl: './idle-task-modal.component.html',
  styleUrls: ['./idle-task-modal.component.css']
})
export class IdleTaskModalComponent implements OnInit {

  hasIdleTask: boolean = false

  task: any = {}

  now: string

  constructor(public idleTaskService: IdleTaskService) {
    this.now = moment().format();

    idleTaskService.isIdle.subscribe((idleTask: any) => {
      this.hasIdleTask = idleTask.hasIdleTask;
      this.task = idleTask;
    });
  }

  ngOnInit() {
  }

  close() {
    this.hasIdleTask = false;
  }

  addTimeToTask() {

  }

  removeTimeFromTask() {

  }

}
