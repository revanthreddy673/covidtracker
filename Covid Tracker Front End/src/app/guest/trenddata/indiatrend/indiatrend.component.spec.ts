import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiatrendComponent } from './indiatrend.component';

describe('IndiatrendComponent', () => {
  let component: IndiatrendComponent;
  let fixture: ComponentFixture<IndiatrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndiatrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiatrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
