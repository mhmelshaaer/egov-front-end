import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialFeesProcurementComponent } from './initial-fees-procurement.component';

describe('InitialFeesProcurementComponent', () => {
  let component: InitialFeesProcurementComponent;
  let fixture: ComponentFixture<InitialFeesProcurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialFeesProcurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialFeesProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
