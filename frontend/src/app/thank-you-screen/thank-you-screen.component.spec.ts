import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouScreenComponent } from './thank-you-screen.component';

describe('ThankYouScreenComponent', () => {
  let component: ThankYouScreenComponent;
  let fixture: ComponentFixture<ThankYouScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankYouScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYouScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
