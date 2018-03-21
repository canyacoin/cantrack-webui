import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineSwitchComponent } from './timeline-switch.component';

describe('TimelineSwitchComponent', () => {
  let component: TimelineSwitchComponent;
  let fixture: ComponentFixture<TimelineSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
