import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionsDateNotificationComponent } from './inspections-date-notification.component';

describe('InspectionsDateNotificationComponent', () => {
  let component: InspectionsDateNotificationComponent;
  let fixture: ComponentFixture<InspectionsDateNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionsDateNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionsDateNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
