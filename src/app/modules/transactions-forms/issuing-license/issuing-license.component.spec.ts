import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuingLicenseComponent } from './issuing-license.component';

describe('IssuingLicenseComponent', () => {
  let component: IssuingLicenseComponent;
  let fixture: ComponentFixture<IssuingLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuingLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuingLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
