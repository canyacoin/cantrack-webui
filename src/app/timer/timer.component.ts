import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';
import * as moment from 'moment';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})

export class TimerComponent implements OnInit {

  constructor(public globalTimer: TimerService) { }

  ngOnInit() {
    let today = moment().format(this.globalTimer.dateFormat);
    if (this.globalTimer.dates[today]) {
      this.globalTimer.today = this.globalTimer.dates[today];
    } else {
      this.initTimeline();
    }
  }

  initTimeline() {
    const hours = 24;

    for (let i = 0; i <= hours; i++) {
      let hour = moment().startOf('day').add(i, 'hour').format('ha');
      this.globalTimer.today.push({
        hour: hour,
        display: false,
        width: `${100 / hours}%`,
        ranges: [],
      })
    }
  }

}
