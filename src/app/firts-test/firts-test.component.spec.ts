import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirtsTestComponent } from './firts-test.component';

describe('FirtsTestComponent', () => {
  let component: FirtsTestComponent;
  let fixture: ComponentFixture<FirtsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirtsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirtsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
