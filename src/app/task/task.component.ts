import { Component, OnInit, Input, ViewChild, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TimerService } from '../timer.service';
import { PreviewService } from '../preview.service';
import * as moment from 'moment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  @ViewChild("taskDescription", { read: ViewContainerRef }) textarea

  @Input() localTimer: TimerService

  taskList: any

  description: string = ''

  id: number

  time: number = 0

  maxRowLength: number = 17

  taskColors = ['#00aca0', '#33ccff', '#15EDD8', '#FF6666', '#0078BF', '#FFC600', '#F9A4D8'];

  taskColor: string

  previewModeIsOn: boolean = false

  constructor(
    public globalTimer: TimerService,
    private resolver: ComponentFactoryResolver,
    public previewService: PreviewService) {

    this.localTimer = new TimerService();
    this.localTimer.setLocalGlobalTimer()
    this.localTimer.counter.isLocalTimer = true;
    this.localTimer.task = this;
    this.globalTimer.addLocalTimer(this.localTimer);

    previewService.isOn.subscribe((previewServiceIsOn: boolean) => {
      this.previewModeIsOn = previewServiceIsOn;
    });
  }

  ngOnInit() {
    this.setTaskColor();

    this.store();

    this.setCurrentTime();

    this.setDescription();
  }

  onPreviewMode(id: number) {
    if (!this.previewModeIsOn) return;

    let tasks = JSON.parse(localStorage.getItem(this.taskList.localTaskListName)).tasks;

    let task = tasks[id];

    return (task.ranges.length <= 0) ? 'd-none' : 'preview-mode';
  }

  setTaskColor() {
    let tasks = JSON.parse(localStorage.getItem(this.taskList.localTaskListName)).tasks;
    this.taskColor = tasks[this.id] && tasks[this.id].color ?
                    tasks[this.id].color :
                    this.taskColors[this.taskList.taskColorIndex];

    this.taskList.taskColorIndex = (this.taskList.taskColorIndex === this.taskColors.length) ? 0 : this.taskList.taskColorIndex + 1;
  }

  setCurrentTime() {
    let tasks = JSON.parse(localStorage.getItem(this.taskList.localTaskListName)).tasks;
    this.localTimer.counter.prev = tasks[this.id].time;
    this.localTimer.counter.ranges = tasks[this.id].ranges;
    this.localTimer.setTime();
  }

  setDescription() {
    let tasks = JSON.parse(localStorage.getItem(this.taskList.localTaskListName)).tasks;

    this.description = tasks[this.id].description || this.description;

    this.setTextareaHeight();
  }

  setTextareaHeight() {
    let textarea = this.textarea.element.nativeElement;

    let maxRowLength = this.maxRowLength;

    let textLength = this.description.length;

    textarea.rows = Math.floor((textLength/maxRowLength) % maxRowLength) + 1;

    setTimeout(() => {
      textarea.focus();
    }, 500);
  }

  add() {
    this.taskList.createTask();
  }

  remove() {
    this.taskList.removeTask(this.id);
  }

  save() {
    let tasks = JSON.parse(localStorage.getItem(this.taskList.localTaskListName)).tasks;

    tasks[this.id] = {
      id: this.id,
      description: this.description,
      time: this.time,
      color: this.taskColor,
      ranges: this.localTimer.counter.ranges,
    };

    localStorage.setItem(this.taskList.localTaskListName, JSON.stringify({tasks: tasks}));
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
    let div = diff / secondsInHour;
    let width = div > 1 ? 100 : (div * 1000);

    let today = from.format(this.globalTimer.dateFormat);

    let hour = this.globalTimer.dates[today][from.format('H')];

    hour.ranges.push({
      width: `${width}%`,
      color: task.color,
      taskId: this.id,
      diff: `${moment.duration(to.diff(from)).asMinutes().toFixed(1)} mins`,
    });

    hour.display = true;

    if (today === from.format(this.globalTimer.dateFormat)) {
      this.globalTimer.dates[today][from.format('H')] = hour;
      this.globalTimer.updateGlobalTimer({dates: this.globalTimer.dates});
    }
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
  }
}
