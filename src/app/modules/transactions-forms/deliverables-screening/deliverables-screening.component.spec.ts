import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverablesScreeningComponent } from './deliverables-screening.component';

describe('DeliverablesScreeningComponent', () => {
  let component: DeliverablesScreeningComponent;
  let fixture: ComponentFixture<DeliverablesScreeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverablesScreeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverablesScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
