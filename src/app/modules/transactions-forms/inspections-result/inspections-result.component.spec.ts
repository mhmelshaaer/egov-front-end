import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionsResultComponent } from './inspections-result.component';

describe('InspectionsResultComponent', () => {
  let component: InspectionsResultComponent;
  let fixture: ComponentFixture<InspectionsResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionsResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
