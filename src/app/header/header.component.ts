import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onPrint() {
    (<any>window).print();
  }

  onPreview() {
    Array.from(document.querySelectorAll('.task-list app-task')).forEach(task => {
      task.classList.remove('col-3');
      task.classList.add('col-12');
      task.querySelector('.timer-trigger-wrapper').classList.add('d-none');
      task.querySelector('.card-footer').classList.add('time-sm');
    }));
    document.querySelector('.new-task-wrapper').classList.add('d-none');
  }

}
