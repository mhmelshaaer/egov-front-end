import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressStructuresComponent } from './address-structures.component';

describe('AddressStructuresComponent', () => {
  let component: AddressStructuresComponent;
  let fixture: ComponentFixture<AddressStructuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressStructuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressStructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
