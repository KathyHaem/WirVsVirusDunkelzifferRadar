import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingConditionsScreenComponent } from './existing-conditions-screen.component';

describe('ExistingConditionsScreenComponent', () => {
  let component: ExistingConditionsScreenComponent;
  let fixture: ComponentFixture<ExistingConditionsScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingConditionsScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingConditionsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
