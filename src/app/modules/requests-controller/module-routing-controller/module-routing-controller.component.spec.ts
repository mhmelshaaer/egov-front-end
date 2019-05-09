import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleRoutingControllerComponent } from './module-routing-controller.component';

describe('ModuleControllerComponent', () => {
  let component: ModuleRoutingControllerComponent;
  let fixture: ComponentFixture<ModuleRoutingControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleRoutingControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleRoutingControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
