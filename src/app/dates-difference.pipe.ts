import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datesDifference'
})

export class DatesDifferencePipe implements PipeTransform {

  transform(value: any, action?: string = 'diff'): string {

    if (action === 'sum') {
      let result = value.reduce((acc, current) => {
        return moment(acc.to).diff(moment(acc.from)) + moment(current.to).diff(moment(current.from));
      });

      return `${moment.duration(result).asMinutes().toFixed(2)} minutes`;
    }

    let from = moment(value[0]);
    let to = moment(value[1]);

    return `${moment.duration(to.diff(from)).asMinutes().toFixed(2)} minutes`;
  }

}
