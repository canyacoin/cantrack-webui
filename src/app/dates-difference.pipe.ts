import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datesDifference'
})

export class DatesDifferencePipe implements PipeTransform {

  transform(value: any, action?: string): string {

    if (action === 'sum') {
      let result = value.reduce((acc, current, index, arr) => {
        let diff = moment(current.to).diff(moment(current.from));

        if (index === arr.length - 1) {
          return acc;
        }

        return acc + diff;
      }, moment(value[0].to).diff(moment(value[0].from)));

      return `${moment.duration(result).asMinutes().toFixed(2)} minutes`;
    }

    let from = moment(value[0]);
    let to = moment(value[1]);

    return `${moment.duration(to.diff(from)).asMinutes().toFixed(2)} minutes`;
  }

}
