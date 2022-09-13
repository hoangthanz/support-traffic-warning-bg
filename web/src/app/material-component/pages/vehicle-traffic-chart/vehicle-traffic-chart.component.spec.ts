import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTrafficChartComponent } from './vehicle-traffic-chart.component';

describe('VehicleTrafficChartComponent', () => {
  let component: VehicleTrafficChartComponent;
  let fixture: ComponentFixture<VehicleTrafficChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleTrafficChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTrafficChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
