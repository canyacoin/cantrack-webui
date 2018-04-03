import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishTimeDataModalComponent } from './publish-time-data-modal.component';

describe('PublishTimeDataModalComponent', () => {
  let component: PublishTimeDataModalComponent;
  let fixture: ComponentFixture<PublishTimeDataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishTimeDataModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishTimeDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
