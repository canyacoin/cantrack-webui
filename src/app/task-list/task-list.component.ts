import { Component, OnInit, ViewChild, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { TimerService } from '../timer.service';
import { IdleTaskService } from '../idle-task.service';
import * as moment from 'moment';

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
    private idleTaskService: IdleTaskService,
    public globalTimer: TimerService) {

    this.localTaskList = localStorage.getItem(this.localTaskListName) ? JSON.parse(localStorage.getItem(this.localTaskListName)) : null;

    if (!this.localTaskList) {
      localStorage.setItem(this.localTaskListName, JSON.stringify({tasks: {}}));
      this.updateLocalTaskList();
    }

    idleTaskService.isIdle.subscribe((idleTask: any) => {
      if (idleTask.addTime) {
        this.addTimeToTask(idleTask);
      }

      if (idleTask.removeTime) {
        this.removeTimeFromTask(idleTask);
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
              task.isIdle = true;
              task.idleFrom = range.from;
              task.idleTo = moment().format();
              task.idleRangeIndex = index;

              let from = moment(range.from);
              let to = moment(task.idleTo);
              let diff = moment.duration(to.diff(from)).asMilliseconds();
              task.idleTimeDifference = diff;

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

  addTimeToTask(_task) {
    let task = this.tasks[_task.id].instance;

    let ranges = task.localTimer.counter.ranges;
    ranges[_task.idleRangeIndex].to = _task.idleTo;

    task.save();

    task.localTimer.counter.prev += _task.idleTimeDifference;
    task.localTimer.addRange().onTimerStart();

    this.globalTimer.counter.prev += _task.idleTimeDifference;
    this.globalTimer.updateGlobalTimer();
    this.globalTimer.onTimerStart();

    this.updateLocalTaskList();
    task.updateGlobalRanges();

    _task.isIdle = false;
    _task.addTime = false;
    _task.removeTime = false;
    this.idleTaskService.hasIdleTask(_task);
  }

  removeTimeFromTask(_task) {
    let task = this.tasks[_task.id].instance;

    let ranges = task.localTimer.counter.ranges;
    ranges.splice(_task.idleRangeIndex, 1);

    task.save();

    let diff = task.localTimer.counter.prev - _task.idleTimeDifference;
    let time = (diff <= 0) ? 0 : diff;

    task.updateLocalTime(time);
    task.localTimer.counter.prev -= time;
    task.localTimer.setTime();

    this.globalTimer.counter.prev -= time;
    this.globalTimer.updateGlobalTimer();
    this.globalTimer.setTime();

    this.updateLocalTaskList();

    _task.isIdle = false;
    _task.addTime = false;
    _task.removeTime = false;
    this.idleTaskService.hasIdleTask(_task);
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

