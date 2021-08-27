import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatetrendComponent } from './statetrend.component';

describe('StatetrendComponent', () => {
  let component: StatetrendComponent;
  let fixture: ComponentFixture<StatetrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatetrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatetrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
