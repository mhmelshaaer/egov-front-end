import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingCostComponent } from './building-cost.component';

describe('BuildingCostComponent', () => {
  let component: BuildingCostComponent;
  let fixture: ComponentFixture<BuildingCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
