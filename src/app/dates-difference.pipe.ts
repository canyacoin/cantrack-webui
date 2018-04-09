import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

@Pipe({
  name: 'datesDifference'
})

export class DatesDifferencePipe implements PipeTransform {

  transform(value: any, action?: string): string {

    if (action === 'sum') {
      let result = this.getSum(value);

      return `${moment.duration(result).asMinutes().toFixed(2)} minutes`;
    }

    if (action == 'as-counter') {
      let distance = this.getSum(value);
      let counter = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      counter.days = Math.floor(distance / (day)),
      counter.hours = Math.floor((distance % (day)) / (hour)),
      counter.minutes = Math.floor((distance % (hour)) / (minute)),
      counter.seconds = Math.floor((distance % (minute)) / second);

      let template = `
        <div class="row text-center">
          <div class="col"><h5>${ counter.days }</h5><small>Days</small></div>
          <div class="col"><h5>${ counter.hours }</h5><small>Hours</small></div>
          <div class="col"><h5>${ counter.minutes }</h5><small>Minutes</small></div>
          <div class="col"><h5>${ counter.seconds }</h5><small>Seconds</small></div>
        </div>
      `;

      return template;
    }

    let from = moment(value[0]);
    let to = moment(value[1]);

    return `${moment.duration(to.diff(from)).asMinutes().toFixed(2)} minutes`;
  }

  getSum(value: any) {
    return value.reduce((acc, current, index, arr) => {
      let diff = moment(current.to).diff(moment(current.from));

      if (index === arr.length - 1) {
        return acc;
      }

      return acc + diff;
    }, moment(value[0].to).diff(moment(value[0].from)));
  }

}
