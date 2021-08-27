import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewoptionsComponent } from './viewoptions.component';

describe('ViewoptionsComponent', () => {
  let component: ViewoptionsComponent;
  let fixture: ComponentFixture<ViewoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewoptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
