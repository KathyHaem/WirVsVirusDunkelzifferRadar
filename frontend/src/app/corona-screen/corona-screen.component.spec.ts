import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronaScreenComponent } from './corona-screen.component';

describe('CoronaScreenComponent', () => {
  let component: CoronaScreenComponent;
  let fixture: ComponentFixture<CoronaScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronaScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
