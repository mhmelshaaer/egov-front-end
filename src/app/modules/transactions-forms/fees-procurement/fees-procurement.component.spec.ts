import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesProcurementComponent } from './fees-procurement.component';

describe('FeesProcurementComponent', () => {
  let component: FeesProcurementComponent;
  let fixture: ComponentFixture<FeesProcurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesProcurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
