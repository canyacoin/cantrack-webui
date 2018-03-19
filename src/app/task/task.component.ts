import { Component, OnInit, Input, ViewChild, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TimerService } from '../timer.service';
import { SubTaskComponent } from '../sub-task/sub-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  @ViewChild("subTask", { read: ViewContainerRef }) container

  @Input() localTimer: TimerService

  subTaskRef: ComponentRef<any>

  taskList: any

  description: string = ''

  id: number

  time: number = 0

  subTasks = {}

  prevSubTaskIndex = 0

  constructor(
    public globalTimer: TimerService,
    private resolver: ComponentFactoryResolver) {
    this.localTimer = new TimerService(true);
    this.localTimer.counter.isLocalTimer = true;
    this.localTimer.task = this;
    this.globalTimer.addLocalTimer(this.localTimer);
  }

  ngOnInit() {
    this.setCurrentTime();
  }

  setCurrentTime() {
    let tasks = JSON.parse(localStorage.getItem('taskList')).tasks;
    this.localTimer.counter.prev = tasks[this.id].time;
    this.localTimer.setTime();
  }

  createSubTask() {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(SubTaskComponent);

    this.subTaskRef = this.container.createComponent(factory);

    this.subTaskRef.instance.parentTask = this;

    this.subTaskRef.instance.id = this.prevSubTaskIndex;

    this.subTaskRef.location.nativeElement.querySelector('textarea').focus();

    this.subTasks[this.prevSubTaskIndex] = this.subTaskRef;

    this.prevSubTaskIndex++;
  }

  add() {
    this.taskList.createTask();
  }

  remove() {
    this.taskList.removeTask(this.id);
  }

  removeSubTask(id: number) {
    this.subTasks[id].destroy();
  }

  updateLocalTime(time) {
    let tasks = JSON.parse(localStorage.getItem('taskList')).tasks;

    let task = tasks[this.id];

    task.time = time;

    this.time = time;

    localStorage.setItem('taskList', JSON.stringify({tasks: tasks}));
  }

  onKeyUp(e) {
    let tasks = JSON.parse(localStorage.getItem('taskList')).tasks;

    let task = tasks[this.id];

    task.description = this.description;

    localStorage.setItem('taskList', JSON.stringify({tasks: tasks}));
  }

  onEnter(e) {
    e.preventDefault();
    this.taskList.createTask();
  }

  onTab(e) {
    e.preventDefault();
    this.createSubTask();
  }

}
