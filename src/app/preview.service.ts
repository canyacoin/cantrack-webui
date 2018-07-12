import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

declare var window: any;

@Injectable()
export class PreviewService {

  isOn: Subject<any> = new Subject<any>()

  isInPreviewMode: boolean = false

  constructor() {}

  turnOn() {
    this.isOn.next(true);
  }

  turnOff() {
    this.isOn.next(false);
  }

  onPreview() {
    this.turnOn();

    Array.from(document.querySelectorAll('.task-list app-task')).forEach(task => {
      task.classList.remove('col-3');
      task.classList.add('col-12');
      task.querySelector('.timer-trigger-wrapper').classList.add('d-none');
      task.querySelector('.card-footer').classList.add('time-sm');

      this.setTaskTextareaHeight(task.querySelector('textarea'), 100);
    });
    document.querySelector('.new-task-wrapper').classList.add('d-none');
    document.querySelector('.counter').classList.remove('d-none');
    document.querySelector('.tasks-title').classList.remove('d-none');
    document.querySelector('.timeline').classList.add('d-none');
    // document.querySelector('.date-wrapper').classList.add('d-none');

    this.isInPreviewMode = true;

    window.jQuery('html, body').animate({scrollTop: 0}, 600);
  }

  onExitPreview() {
    this.turnOff();

    Array.from(document.querySelectorAll('.task-list app-task')).forEach(task => {
      task.classList.remove('col-12');
      task.classList.add('col-3');
      task.querySelector('.timer-trigger-wrapper').classList.remove('d-none');
      task.querySelector('.card-footer').classList.remove('time-sm');

      this.setTaskTextareaHeight(task.querySelector('textarea'), 17);
    });
    document.querySelector('.new-task-wrapper').classList.remove('d-none');
    document.querySelector('.counter').classList.add('d-none');
    document.querySelector('.tasks-title').classList.add('d-none');
    document.querySelector('.timeline').classList.remove('d-none');
    // document.querySelector('.date-wrapper').classList.remove('d-none');

    this.isInPreviewMode = false;

    window.jQuery('html, body').animate({scrollTop: 0}, 600);
  }

  setTaskTextareaHeight(textarea, maxRowLength) {
    let textLength = textarea.textLength;

    textarea.rows = Math.floor((textLength/maxRowLength) % maxRowLength) + 1;
  }

}
