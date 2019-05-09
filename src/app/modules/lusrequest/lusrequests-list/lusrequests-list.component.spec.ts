import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LUSRequestsListComponent } from './lusrequests-list.component';

describe('LUSRequestsListComponent', () => {
  let component: LUSRequestsListComponent;
  let fixture: ComponentFixture<LUSRequestsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LUSRequestsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LUSRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
