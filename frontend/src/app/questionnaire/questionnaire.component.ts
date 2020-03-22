import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  public welcomeScreenActive: boolean;
  public symptomsScreenActive: boolean;
  public coronaScreenActive: boolean;

  constructor() { }

  ngOnInit(): void {
    this.welcomeScreenActive = true;
    this.symptomsScreenActive = false;
    this.coronaScreenActive = false;
  }

  goToSymptomsScreen(event: boolean) {
    this.welcomeScreenActive = false;
    this.symptomsScreenActive = true;
  }

  goToCoronaScreen(event: boolean) {
    this.symptomsScreenActive = false;
    this.coronaScreenActive = true;
  }
}
