import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptiondetailComponent } from './optiondetail.component';

describe('OptiondetailComponent', () => {
  let component: OptiondetailComponent;
  let fixture: ComponentFixture<OptiondetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptiondetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
