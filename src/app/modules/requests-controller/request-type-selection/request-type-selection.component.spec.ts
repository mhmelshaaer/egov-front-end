import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTypeSelectionComponent } from './request-type-selection.component';

describe('RequestTypeSelectionComponent', () => {
  let component: RequestTypeSelectionComponent;
  let fixture: ComponentFixture<RequestTypeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTypeSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
