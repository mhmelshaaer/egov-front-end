import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LUSRequestMetaDataComponent } from './lusrequest-meta-data.component';

describe('LUSRequestMetaDataComponent', () => {
  let component: LUSRequestMetaDataComponent;
  let fixture: ComponentFixture<LUSRequestMetaDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LUSRequestMetaDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LUSRequestMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
