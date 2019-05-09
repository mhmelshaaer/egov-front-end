import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LUSRequestDataComponent } from './lusrequest-data.component';

describe('LUSRequestDataComponent', () => {
  let component: LUSRequestDataComponent;
  let fixture: ComponentFixture<LUSRequestDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LUSRequestDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LUSRequestDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
