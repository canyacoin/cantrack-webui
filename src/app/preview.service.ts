import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class PreviewService {

  isOn: Subject<any> = new Subject<any>()

  constructor() {}

  turnOn() {
    this.isOn.next(true);
  }

  turnOff() {
    this.isOn.next(false);
  }

}
