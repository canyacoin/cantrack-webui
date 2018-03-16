import { Injectable } from '@angular/core';

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

  countUp() {
    let counter = this.counter;

    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;

    let prev = 0;

    counter.intervalFn = setInterval(function() {

        counter.prev += second;
        let distance = counter.prev;

        counter.days = Math.floor(distance / (day)),
        counter.hours = Math.floor((distance % (day)) / (hour)),
        counter.minutes = Math.floor((distance % (hour)) / (minute)),
        counter.seconds = Math.floor((distance % (minute)) / second);

    }, second);

    return this;
  }

}
