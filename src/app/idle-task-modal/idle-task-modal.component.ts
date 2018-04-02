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

    idleTaskService.isIdle.subscribe((task: any) => {
      this.hasIdleTask = task.isIdle;
      this.task = task;
    });
  }

  ngOnInit() {
  }

  close() {
    this.hasIdleTask = false;
  }
}
