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

  previousDate: string

  displayPrevious: boolean = false

  displayNext: boolean = false

  constructor(public globalTimer: TimerService) {}

  ngOnInit() {
    this.previousDate = this.previousDate || moment().format(this.globalTimer.dateFormat);

    this.onChange();

    this.setDateString(this.getPreviousDateObject())
  }

  private getDateObject(date: string) {
    return moment(date);
  }

  private getPreviousDateObject() {
    return moment(this.previousDate, this.globalTimer.dateFormat);
  }

  onChange() {
    this.displayPrevious = this.globalTimer.createdAt != this.previousDate;

    let today = moment().format(this.globalTimer.dateFormat);
    this.displayNext = this.previousDate != today;
  }

  nextDate() {
    let previousDate = this.getPreviousDateObject();

    let nextDay = previousDate.add(1, 'days');

    this.setDateString(nextDay);

    this.globalTimer.today = this.globalTimer.dates[nextDay.format(this.globalTimer.dateFormat)];

    this.previousDate = nextDay.format(this.globalTimer.dateFormat);

    this.onChange();
  }

  prevDate() {
    let previousDate = this.getPreviousDateObject();

    let prevDay = previousDate.subtract(1, 'days');

    this.setDateString(prevDay);

    this.globalTimer.today = this.globalTimer.dates[prevDay.format(this.globalTimer.dateFormat)];

    this.previousDate = prevDay.format(this.globalTimer.dateFormat);

    this.onChange();
  }

  setDateString(date) {
    let today = moment().format(this.globalTimer.dateFormat);

    this.date = date.format('MMM Do YYYY')
  }

}
