import { Component, OnInit } from '@angular/core';
import { PreviewService } from '../preview.service';
import { EthereumService } from '../ethereum.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isInPreviewMode: boolean = false

  constructor(
    public previewService: PreviewService,
    public ethereumService: EthereumService) {}

  ngOnInit() {
  }

  onPrint() {
    (<any>window).print();
  }

  onPreview() {
    this.previewService.turnOn();

    Array.from(document.querySelectorAll('.task-list app-task')).forEach(task => {
      task.classList.remove('col-3');
      task.classList.add('col-12');
      task.querySelector('.timer-trigger-wrapper').classList.add('d-none');
      task.querySelector('.card-footer').classList.add('time-sm');

      this.setTaskTextareaHeight(task.querySelector('textarea'), 100);
    });
    document.querySelector('.new-task-wrapper').classList.add('d-none');
    document.querySelector('.counter').classList.remove('d-none');
    document.querySelector('#canya-cta').classList.add('d-none');
    document.querySelector('.tasks-title').classList.remove('d-none');
    document.querySelector('.timeline').classList.add('d-none');
    document.querySelector('.date-wrapper').classList.add('d-none');

    this.isInPreviewMode = true;
  }

  onExitPreview() {
    this.previewService.turnOff();

    Array.from(document.querySelectorAll('.task-list app-task')).forEach(task => {
      task.classList.remove('col-12');
      task.classList.add('col-3');
      task.querySelector('.timer-trigger-wrapper').classList.remove('d-none');
      task.querySelector('.card-footer').classList.remove('time-sm');

      this.setTaskTextareaHeight(task.querySelector('textarea'), 17);
    });
    document.querySelector('.new-task-wrapper').classList.remove('d-none');
    document.querySelector('#canya-cta').classList.remove('d-none');
    document.querySelector('.counter').classList.add('d-none');
    document.querySelector('.tasks-title').classList.add('d-none');
    document.querySelector('.timeline').classList.remove('d-none');
    document.querySelector('.date-wrapper').classList.remove('d-none');

    this.isInPreviewMode = false;
  }

  setTaskTextareaHeight(textarea, maxRowLength) {
    let textLength = textarea.textLength;

    textarea.rows = Math.floor((textLength/maxRowLength) % maxRowLength) + 1;
  }

}
