import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecasesComponent } from './updatecases.component';

describe('UpdatecasesComponent', () => {
  let component: UpdatecasesComponent;
  let fixture: ComponentFixture<UpdatecasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
