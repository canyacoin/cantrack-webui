import { Injectable, Optional } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';

const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

@Injectable()
export class TimerService {

  today = []

  dates = {}

  createdAt: string

  localTimers = [];

  intervalFn: any;

  counter = {
    isOn: false,
    isLocalTimer: false,
    prev: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ranges: []
  }

  task: any

  previousTask: any

  globalTimer: any

  localStorageName: string = 'globalTimer'

  dateFormat: string = 'Y-M-D'

  onReset: Subject<any> = new Subject<any>()

  constructor() {}

  reset(){
    localStorage.setItem(this.localStorageName, null);

    this.counter = {
      isOn: false,
      isLocalTimer: false,
      prev: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      ranges: []
    }

    this.dates = {}

    this.today = [];

    this.setLocalGlobalTimer();

    this.onReset.next({});
  }

  setLocalGlobalTimer() {
    this.globalTimer = localStorage.getItem(this.localStorageName) ?
                      JSON.parse(localStorage.getItem(this.localStorageName)) :
                      null;

    if (!this.globalTimer) {
      this.createdAt = moment().format(this.dateFormat);
      this.updateGlobalTimer();
    } else {
      this.globalTimer.counter.isOn = false;
      this.counter = this.globalTimer.counter;
      this.createdAt = this.globalTimer.createdAt;
      this.dates = this.globalTimer.dates;
    }
  }

  updateGlobalTimer(data?: any) {
    let _default = {
      counter: this.counter,
      createdAt: this.createdAt,
      dates: this.dates,
    };

    let _data = Object.assign(data || {}, _default);

    localStorage.setItem(this.localStorageName, JSON.stringify(_data));

    this.globalTimer = JSON.parse(localStorage.getItem(this.localStorageName));
  }

  onTimerStart() {
    this.counter.isOn = true;

    this.countUp();

    return this;
  }

  onTimerStop() {
    this.counter.isOn = false;

    clearInterval(this.intervalFn);

    if (!this.counter.isLocalTimer) {
      this.updateGlobalTimer({counter: this.counter});
    }

    return this;
  }

  addRange() {
    this.counter.ranges.push({
      from: moment().format(),
    });

    this.task.updateLocalRanges();

    return this;
  }

  closeRange() {
    let now = moment().format();

    this.counter.ranges[this.counter.ranges.length-1].to = now;

    this.task.updateLocalRanges();
    this.task.updateGlobalRanges();
  }

  stopLocalTimers() {
    this.localTimers.forEach(timer => {
      timer.onTimerStop();
    });

    return this;
  }

  addLocalTimer(timer: TimerService) {
    this.localTimers.push(timer);

    return this;
  }

  setTime() {
    let counter = this.counter;

    let task = this.task;

    if (task) task.updateLocalTime(counter.prev);

    let distance = counter.prev;

    counter.days = Math.floor(distance / (day)),
    counter.hours = Math.floor((distance % (day)) / (hour)),
    counter.minutes = Math.floor((distance % (hour)) / (minute)),
    counter.seconds = Math.floor((distance % (minute)) / second);

    if (!counter.isLocalTimer) {
      this.updateGlobalTimer({counter: counter});
    }

    if (counter.isLocalTimer && counter.minutes >= 59 && counter.seconds >= 59) {
      this.closeRange();
      this.addRange();
    }
  }

  countUp() {
    let timer = this;

    this.intervalFn = setInterval(function() {

      timer.counter.prev += second;

      timer.setTime();

    }, second);

    return this;
  }

}
