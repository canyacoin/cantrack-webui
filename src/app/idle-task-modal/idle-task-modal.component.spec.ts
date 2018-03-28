import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleTaskModalComponent } from './idle-task-modal.component';

describe('IdleTaskModalComponent', () => {
  let component: IdleTaskModalComponent;
  let fixture: ComponentFixture<IdleTaskModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdleTaskModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
