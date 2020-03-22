import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomsScreenComponent } from './symptoms-screen.component';

describe('SymptomsScreenComponent', () => {
  let component: SymptomsScreenComponent;
  let fixture: ComponentFixture<SymptomsScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomsScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
