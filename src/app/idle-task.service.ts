import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class IdleTaskService {

  isIdle: Subject<any> = new Subject<any>()

  task: any

  constructor() {}

  hasIdleTask(task) {
    this.task = task;
    this.isIdle.next(task);
  }

  addTimeToTask() {
    this.task.addTime = true;
    this.task.remove = false;
    this.isIdle.next(this.task);
  }

  removeTimeFromTask() {
    this.task.addTime = false;
    this.task.remove = true;
    this.isIdle.next(this.task);
  }

}
