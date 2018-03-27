import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datesDifference'
})

export class DatesDifferencePipe implements PipeTransform {

  transform(value: any, args?: any): string {
    let from = moment(value[0]);
    let to = moment(value[1]);

    return `${moment.duration(to.diff(from)).asMinutes().toFixed(2)} minutes`;
  }

}
