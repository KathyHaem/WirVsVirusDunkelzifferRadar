import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  public welcomeScreenActive: boolean;
  public symptomsScreenActive: boolean;

  constructor() { }

  ngOnInit(): void {
    this.welcomeScreenActive = true;
  }

  goToSymptomsScreen(event: boolean) {
    this.welcomeScreenActive = false;
    this.symptomsScreenActive = true;
  }
}
