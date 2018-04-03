import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDataWrapperComponent } from './contract-data-wrapper.component';

describe('ContractDataWrapperComponent', () => {
  let component: ContractDataWrapperComponent;
  let fixture: ComponentFixture<ContractDataWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractDataWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDataWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
