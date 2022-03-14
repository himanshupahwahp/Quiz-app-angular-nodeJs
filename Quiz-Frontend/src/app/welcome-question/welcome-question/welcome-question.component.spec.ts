import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeQuestionComponent } from './welcome-question.component';

describe('WelcomeQuestionComponent', () => {
  let component: WelcomeQuestionComponent;
  let fixture: ComponentFixture<WelcomeQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
