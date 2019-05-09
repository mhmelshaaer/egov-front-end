import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionsDatesComponent } from './inspections-dates.component';

describe('InspectionsDatesComponent', () => {
  let component: InspectionsDatesComponent;
  let fixture: ComponentFixture<InspectionsDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionsDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionsDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
