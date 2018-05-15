import { Component, OnInit, NgZone } from '@angular/core';
import { TimerService } from '../timer.service';
import { EthereumService } from '../ethereum.service';
import * as moment from 'moment';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})

export class TimerComponent implements OnInit {

  today: string

  constructor(
    public globalTimer: TimerService,
    public ethereumService: EthereumService,
    private zone: NgZone) {

    globalTimer.onReset.subscribe(data => {
      this.ngOnInit();
      zone.run(() => console.log('updated timer'));
    });
  }

  ngOnInit() {
    this.today = moment().format(this.globalTimer.dateFormat);

    if (this.globalTimer.dates[this.today]) {
      this.globalTimer.today = this.globalTimer.dates[this.today];
    } else {
      this.initTimeline();
      this.globalTimer.dates[this.today] = this.globalTimer.today;
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
      });
    }
  }
}
