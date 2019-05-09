import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNavigatorComponent } from './request-navigator.component';

describe('RequestNavigatorComponent', () => {
  let component: RequestNavigatorComponent;
  let fixture: ComponentFixture<RequestNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
