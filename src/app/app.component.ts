import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @Input() projectName: string = 'Click to edit this project name'

  constructor() {
    this.projectName = localStorage.getItem('projectName') ?
                        localStorage.getItem('projectName') :
                        this.projectName;
  }

  onKeyUp(e) {
    localStorage.setItem('projectName', e.target.value);
  }
}
