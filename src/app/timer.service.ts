import { Injectable } from '@angular/core';

const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

@Injectable()
export class TimerService {

  localTimers = [];

  counter = {
    intervalFn: null,
    isOn: false,
    isLocalTimer: false,
    prev: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  task: any;

  constructor() { }

  onTimerStart() {
    this.counter.isOn = true;

    this.countUp();

    return this;
  }

  onTimerStop() {
    this.counter.isOn = false;

    clearInterval(this.counter.intervalFn);

    return this;
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
  }

  countUp() {
    let timer = this;

    this.counter.intervalFn = setInterval(function() {

      timer.counter.prev += second;

      timer.setTime();

    }, second);

    return this;
  }

}
