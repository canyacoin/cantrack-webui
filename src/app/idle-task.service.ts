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
    this.task.removeTime = false;
    this.isIdle.next(this.task);
  }

  removeTimeFromTask() {
    this.task.addTime = false;
    this.task.removeTime = true;
    this.isIdle.next(this.task);
  }

}
