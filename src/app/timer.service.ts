import { Injectable, Optional } from '@angular/core';
import * as moment from 'moment';

const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

@Injectable()
export class TimerService {

  today = []

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

  globalTimer: any

  localStorageName: string = 'globalTimer';

  constructor(@Optional() isLocalTimer: boolean = false) {
    if (!isLocalTimer) {
      this.setLocalGlobalTimer();

      this.initTimeline();
    }
  }

  initTimeline() {
    const hours = 24;

    for (let i = 0; i <= hours; i++) {
      let hour = moment().startOf('day').add(i, 'hour').format('ha');
      this.today.push({
        hour: hour,
        display: (i == 0 || i == hours) ? true : false,
        width: `${100 / hours}%`,
        ranges: [],
      })
    }
    console.log(this.today);
  }

  setLocalGlobalTimer(isLocalTimer) {
    this.globalTimer = localStorage.getItem(this.localStorageName) ?
                      JSON.parse(localStorage.getItem(this.localStorageName)) :
                      null;

    if (!this.globalTimer) {
      this.updateGlobalTimer({counter: this.counter});
    } else {
      this.globalTimer.counter.isOn = false;
      this.counter = this.globalTimer.counter;
    }
  }

  updateGlobalTimer(data) {
    localStorage.setItem(this.localStorageName, JSON.stringify(data));
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

    if (!this.counter.isLocalTimer) {
      this.updateGlobalTimer({counter: counter});
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
