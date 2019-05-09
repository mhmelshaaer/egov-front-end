import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LUSRequestHomeComponent } from './lusrequest-home.component';

describe('LUSRequestHomeComponent', () => {
  let component: LUSRequestHomeComponent;
  let fixture: ComponentFixture<LUSRequestHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LUSRequestHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LUSRequestHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
