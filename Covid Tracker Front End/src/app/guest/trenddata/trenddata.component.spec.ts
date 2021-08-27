import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenddataComponent } from './trenddata.component';

describe('TrenddataComponent', () => {
  let component: TrenddataComponent;
  let fixture: ComponentFixture<TrenddataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenddataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
