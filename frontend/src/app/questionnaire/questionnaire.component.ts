import {Component, OnInit} from '@angular/core';
import {ResponseCompilerService} from "../response-data/ResponseCompilerService";

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  public welcomeScreenActive: boolean;
  public symptomsScreenActive: boolean;
  public coronaScreenActive: boolean;
  public existingConditionsScreenActive: boolean;
  public goingOutsideScreenActive: boolean;

  constructor(private responseCompilerService: ResponseCompilerService) {
  }

  ngOnInit(): void {
    this.welcomeScreenActive = true;
    this.symptomsScreenActive = false;
    this.coronaScreenActive = false;
    this.existingConditionsScreenActive = false;
    this.goingOutsideScreenActive = false;
  }

  completedWelcomeScreen(event: boolean) {
    if (event == false) {
      return;
    }
    this.welcomeScreenActive = false;
    this.symptomsScreenActive = true;
  }

  completedSymptomsScreen(event: boolean) {
    if (event == false) {
      return;
    }
    this.symptomsScreenActive = false;
    this.coronaScreenActive = true;
  }

  completedCoronaTestScreen(event: boolean) {
    if (event == false) {
      return;
    }
    this.coronaScreenActive = false;
    if (this.responseCompilerService.isFirstTime()) {
      this.existingConditionsScreenActive = true;
      return;
    }
    this.goingOutsideScreenActive = true;
  }

  completeConditionsScreen($event: boolean) {

  }
}
