import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  counter = {
    intervalFn: null,
    isOn: false,
    prev: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  ngOnInit() {
    // this.countUp();
  }

  onTimerStart() {
    this.countUp();
  }

  onTimerStop() {
    this.counter.isOn = !this.counter.isOn;
    clearInterval(this.counter.intervalFn);
  }

  countUp() {
    let counter = this.counter;

    counter.isOn = !counter.isOn;

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
  }
}
