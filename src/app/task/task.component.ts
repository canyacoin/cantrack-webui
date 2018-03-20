import { Component, OnInit, Input, ViewChild, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TimerService } from '../timer.service';
import { SubTaskComponent } from '../sub-task/sub-task.component';
import * as moment from 'moment';

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

  maxRowLength: number = 17

  taskColors = ['#33CCFF', '#6610f2', '#6f42c1', '#F9A4D8', '#FF6666', '#fd7e14', '#FFC600', '#00ACA0', '#20c997', '#17a2b8']

  taskColor: string

  constructor(
    public globalTimer: TimerService,
    private resolver: ComponentFactoryResolver) {
    this.localTimer = new TimerService(true);
    this.localTimer.counter.isLocalTimer = true;
    this.localTimer.task = this;
    this.globalTimer.addLocalTimer(this.localTimer);
  }

  ngOnInit() {
    this.setTaskColor();

    this.store();

    this.setCurrentTime();

    setTimeout(() => {
      this.updateGlobalRanges();
    }, 1000);

  }

  setTaskColor() {
    let tasks = JSON.parse(localStorage.getItem(this.taskList.localTaskListName)).tasks;
    this.taskColor = tasks[this.id] && tasks[this.id].color ?
                    tasks[this.id].color :
                    this.taskColors[Math.floor(Math.random() * this.taskColors.length-1) + 1];
  }

  setCurrentTime() {
    let tasks = JSON.parse(localStorage.getItem(this.taskList.localTaskListName)).tasks;
    this.localTimer.counter.prev = tasks[this.id].time;
    this.localTimer.counter.ranges = tasks[this.id].ranges;
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

  store() {
    let tasks = JSON.parse(localStorage.getItem(this.taskList.localTaskListName)).tasks;

    tasks[this.id] = {
      id: this.id,
      description: tasks[this.id] ? tasks[this.id].description : this.description,
      time: tasks[this.id] ? tasks[this.id].time : this.time,
      color: tasks[this.id] && tasks[this.id].color ? tasks[this.id].color : this.taskColor,
      ranges: tasks[this.id] ? tasks[this.id].ranges : this.localTimer.counter.ranges,
    };

    localStorage.setItem(this.taskList.localTaskListName, JSON.stringify({tasks: tasks}));
  }

  updateLocalTime(time) {
    let tasks = JSON.parse(localStorage.getItem(this.taskList.localTaskListName)).tasks;

    let task = tasks[this.id];

    task.time = time;

    this.time = time;

    localStorage.setItem(this.taskList.localTaskListName, JSON.stringify({tasks: tasks}));
  }

  updateLocalRanges() {
    let tasks = JSON.parse(localStorage.getItem(this.taskList.localTaskListName)).tasks;

    let task = tasks[this.id];

    task.ranges = this.localTimer.counter.ranges;

    localStorage.setItem(this.taskList.localTaskListName, JSON.stringify({tasks: tasks}));
  }

  updateGlobalRanges() {
    let tasks = JSON.parse(localStorage.getItem(this.taskList.localTaskListName)).tasks;

    let task = tasks[this.id];

    let ranges = task.ranges;

    if (ranges.length === 0) return;

    let lastRange = ranges[ranges.length-1];

    let secondsInHour = 60 * 60;

    let from = moment(lastRange.from);
    let to = moment(lastRange.to);
    let diff = to.unix() - from.unix();
    let div = (diff/secondsInHour);
    let width = div > 1 ? 100 : div * 100;
    let hour = this.globalTimer.today[from.format('H')];

    hour.ranges.push({
      width: `${width}%`,
      color: task.color,
      taskId: this.id,
      diff: diff,
    });

    hour.display = true;
  }

  onKeyUp(e) {
    let tasks = JSON.parse(localStorage.getItem(this.taskList.localTaskListName)).tasks;

    let task = tasks[this.id];

    task.description = this.description;

    localStorage.setItem(this.taskList.localTaskListName, JSON.stringify({tasks: tasks}));

    let el = e.target;

    el.rows = Math.floor((el.textLength/this.maxRowLength) % this.maxRowLength) + 1;
  }

  onFocus(e) {
    document.querySelector(`#task-${this.id}`).classList.add('on-focus');
  }

  onBlur(e) {
    document.querySelector(`#task-${this.id}`).classList.remove('on-focus');
  }

  onEnter(e) {
    e.preventDefault();
    this.taskList.createTask();
  }

  onTab(e) {
    e.preventDefault();
    this.taskList.createTask();
    // this.createSubTask();
  }

}
