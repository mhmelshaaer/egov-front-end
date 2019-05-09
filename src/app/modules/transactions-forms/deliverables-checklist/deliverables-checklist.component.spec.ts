import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverablesChecklistComponent } from './deliverables-checklist.component';

describe('DeliverablesChecklistComponent', () => {
  let component: DeliverablesChecklistComponent;
  let fixture: ComponentFixture<DeliverablesChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverablesChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverablesChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
