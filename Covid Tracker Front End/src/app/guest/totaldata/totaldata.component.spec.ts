import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotaldataComponent } from './totaldata.component';

describe('TotaldataComponent', () => {
  let component: TotaldataComponent;
  let fixture: ComponentFixture<TotaldataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotaldataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotaldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
