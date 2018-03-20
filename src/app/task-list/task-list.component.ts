import { Component, OnInit, ViewChild, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {

  @ViewChild("taskList", { read: ViewContainerRef }) container

  taskRef: ComponentRef<any>

  tasks = {}

  prevTaskIndex = 0

  localTaskList: any;

  constructor(private resolver: ComponentFactoryResolver) {
    this.localTaskList = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : null;

    if (!this.localTaskList) {
      localStorage.setItem('taskList', JSON.stringify({tasks: {}}));
      this.updateLocalTaskList();
    }
  }

  ngOnInit() {
    this.loadLocalTasks();
  }

  loadLocalTasks() {
    let keys = Object.keys(this.localTaskList.tasks);

    if (keys.length === 0) {
      return this.createTask();
    }

    keys.forEach(key => {
      this.prevTaskIndex = this.localTaskList.tasks[key].id;
      this.createTask();
    });
  }

  createTask() {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(TaskComponent);

    this.taskRef = this.container.createComponent(factory);

    this.taskRef.location.nativeElement.classList.add('col-3');

    this.taskRef.location.nativeElement.id = `task-${this.prevTaskIndex}`;

    this.taskRef.instance.taskList = this;

    this.taskRef.instance.id = this.prevTaskIndex;

    let textarea = this.taskRef.location.nativeElement.querySelector('textarea');

    let maxRowLength = this.taskRef.instance.maxRowLength;

    let textLength = this.taskRef.instance.description.length;

    textarea.rows = Math.floor((textLength/maxRowLength) % maxRowLength) + 1;
    textarea.focus();

    this.tasks[this.prevTaskIndex] = this.taskRef;

    this.prevTaskIndex++;

    this.storeTask();
  }

  storeTask() {
    let taskList = JSON.parse(localStorage.getItem('taskList'));
    let localTask = this.localTaskList.tasks[this.taskRef.instance.id];

    taskList.tasks[this.taskRef.instance.id] = {
      id: this.taskRef.instance.id,
      description: localTask ? localTask.description : '',
      subTasks: {},
      time: localTask ? localTask.time : 0,
      ranges: localTask ? localTask.ranges : [],
    }

    localStorage.setItem('taskList', JSON.stringify({tasks: taskList.tasks}));

    this.updateLocalTaskList();
  }

  updateLocalTaskList() {
    this.localTaskList = JSON.parse(localStorage.getItem('taskList'));
  }

  removeTask(id: number) {
    this.tasks[id].destroy();
    delete this.localTaskList.tasks[id];
    localStorage.setItem('taskList', JSON.stringify({tasks: this.localTaskList.tasks}));
    this.updateLocalTaskList();
  }
}










