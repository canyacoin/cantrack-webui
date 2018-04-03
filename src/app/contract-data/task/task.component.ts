import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  id: number

  description: string

  color: string

  ranges: Array<any> = []

  constructor() {
  }

  ngOnInit() {}

}
