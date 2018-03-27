import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class PreviewService {

  isOn: Observable<boolean>

  isOnSubject: Subject<boolean>

  constructor() {
    this.isOnSubject = new Subject<boolean>();
    this.isOn = this.isOnSubject.asObservable();
  }

  turnOn() {
    this.isOnSubject.next(true);
  }

  turnOff() {
    this.isOnSubject.next(false);
  }

}
