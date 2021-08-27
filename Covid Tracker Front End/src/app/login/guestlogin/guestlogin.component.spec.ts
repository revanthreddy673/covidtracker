import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestloginComponent } from './guestlogin.component';

describe('GuestloginComponent', () => {
  let component: GuestloginComponent;
  let fixture: ComponentFixture<GuestloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
