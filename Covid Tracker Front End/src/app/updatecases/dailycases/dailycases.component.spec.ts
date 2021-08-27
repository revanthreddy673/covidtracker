import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailycasesComponent } from './dailycases.component';

describe('DailycasesComponent', () => {
  let component: DailycasesComponent;
  let fixture: ComponentFixture<DailycasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailycasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailycasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
