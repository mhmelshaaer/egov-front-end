import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialFeesComponent } from './initial-fees.component';

describe('InitialFeesComponent', () => {
  let component: InitialFeesComponent;
  let fixture: ComponentFixture<InitialFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
