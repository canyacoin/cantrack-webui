import { Component, OnInit, ViewChild, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { IdleTaskService } from '../idle-task.service';

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

  localTaskListName: string = 'taskList'

  defaultTasks: Array<string> = [
    'Send contract to the client',
    'Ask for company assets',
    'Setup a tribe for the project',
    'Set project milestones',
    'Create GIT repo',
    'Another task...',
  ];

  taskIsIdle: boolean = false

  constructor(
    private resolver: ComponentFactoryResolver,
    private idleTaskService: IdleTaskService) {
    this.localTaskList = localStorage.getItem(this.localTaskListName) ? JSON.parse(localStorage.getItem(this.localTaskListName)) : null;

    if (!this.localTaskList) {
      localStorage.setItem(this.localTaskListName, JSON.stringify({tasks: {}}));
      this.updateLocalTaskList();
    }

    idleTaskService.isIdle.subscribe((idleTask: any) => {
      if (idleTask.addTime) {
        console.log(idleTask);
      }

      if (idleTask.remove) {
        console.log(idleTask);
      }
    });
  }

  ngOnInit() {
    this.loadLocalTasks();
    this.checkForIdleTasks();
  }

  checkForIdleTasks() {
    let tasks = this.localTaskList.tasks;
    if (Object.keys(tasks).length > 0) {
      Object.keys(tasks).forEach(key => {
        if (tasks[key].ranges && tasks[key].ranges.length > 0) {
          tasks[key].ranges.forEach((range, index) => {
            if (!range.to) {
              let task = tasks[key];
              task.hasIdleTask = true;
              task.idleFrom = range.from;
              task.idleRangeIndex = index;
              this.idleTaskService.hasIdleTask(task);
            }
          });
        }
      });
    }
  }

  loadLocalTasks() {
    let keys = Object.keys(this.localTaskList.tasks);

    if (keys.length === 0) {
      for (let i = 0; i < this.defaultTasks.length; i++) {
        this.createTask(this.defaultTasks[i]);
      }
    }

    keys.forEach(key => {
      this.prevTaskIndex = this.localTaskList.tasks[key].id;
      this.createTask();
    });
  }

  createTask(description?: string) {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(TaskComponent);

    this.taskRef = this.container.createComponent(factory);

    this.taskRef.location.nativeElement.classList.add('col-3');

    this.taskRef.location.nativeElement.id = `task-${this.prevTaskIndex}`;

    this.taskRef.instance.taskList = this;

    this.taskRef.instance.id = this.prevTaskIndex;

    this.taskRef.instance.description = description || '';

    this.tasks[this.prevTaskIndex] = this.taskRef;

    this.prevTaskIndex++;
  }

  updateLocalTaskList() {
    this.localTaskList = JSON.parse(localStorage.getItem(this.localTaskListName));
  }

  removeTask(id: number) {
    this.tasks[id].destroy();
    delete this.localTaskList.tasks[id];
    localStorage.setItem(this.localTaskListName, JSON.stringify({tasks: this.localTaskList.tasks}));
    this.updateLocalTaskList();
  }
}










