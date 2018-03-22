import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';
import * as moment from 'moment';

@Component({
  selector: 'app-timeline-switch',
  templateUrl: './timeline-switch.component.html',
  styleUrls: ['./timeline-switch.component.css']
})

export class TimelineSwitchComponent implements OnInit {

  date: string = 'Today'

  previousDate: any

  displayPrevious: boolean = false

  displayNext: boolean = false

  constructor(public globalTimer: TimerService) {}

  ngOnInit() {
    this.previousDate = this.previousDate || moment();
  }

  onPrevious() {
    this.displayPrevious = this.globalTimer.createdAt != this.previousDate.format(this.globalTimer.dateFormat);
  }

  onNext() {
    let nextDay = this.previousDate.add(1, 'days').format(this.globalTimer.dateFormat);
    this.displayNext = this.globalTimer.dates[nextDay] != undefined;
  }

  nextDate() {
    let nextDay = this.previousDate.add(1, 'days');

    this.setDateString(nextDay);

    this.globalTimer.today = this.globalTimer.dates[nextDay.format(this.globalTimer.dateFormat)];

    this.onNext();
  }

  prevDate() {
    let prevDay = this.previousDate.subtract(1, 'days');

    this.setDateString(prevDay);

    this.globalTimer.today = this.globalTimer.dates[prevDay.format(this.globalTimer.dateFormat)];

    this.onPrevious();
  }

  setDateString(date) {
    let today = moment().format(this.globalTimer.dateFormat);

    this.date = today === date.format(this.globalTimer.dateFormat) ? 'Today' : date.format('MMM Do YYYY');
  }

}
