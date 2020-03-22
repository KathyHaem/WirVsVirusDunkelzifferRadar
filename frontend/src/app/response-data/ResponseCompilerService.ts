import {Injectable} from '@angular/core';
import {
  ConditionsScreenResponse,
  CoronaScreenResponse,
  FormResponse,
  PersonalData,
  SymptomsScreenResponse,
  WelcomeScreenResponse
} from "./FormResponse";

import {Questionnaire} from "../../api/model/questionnaire"

@Injectable({
  providedIn: 'root'
})
export class ResponseCompilerService {
  private response: Questionnaire;

  constructor() {
    this.response = <Questionnaire>{};
  }

  public isFirstTime(): boolean {
    if (this.response.first_time == undefined) return true;
    else return !this.response.first_time;
  }

  addWelcomeScreenData(value: WelcomeScreenResponse): void {
    console.log(value);
    this.response.first_time = value.seenBefore === "yes";
    if (value.personalData) {
      this.response.age = value.personalData.age || undefined;
      this.response.gender = value.personalData.gender || undefined;
      this.response.zip_code = value.personalData.postcode || undefined;
      return;
    }
  }

  addSymptomsScreenData(value: SymptomsScreenResponse): void {
    console.log(value);
    this.response.cough = value.cough || undefined;
    this.response.cough_dry = value.coughData.coughDry || undefined;
    this.response.cough_productive = value.coughData.coughProductive || undefined;
    this.response.cough_painful = value.coughData.coughPainful || undefined;
    this.response.fever = value.fever || undefined;
    this.response.fever_suspected = value.feverData.feverSuspected || undefined;
    this.response.fever_confirmed = value.feverData.feverConfirmed || undefined;
    this.response.nose_affected = value.nose || undefined;
    this.response.pain = value.pain || undefined;
    this.response.pain_head = value.painData.painHead || undefined;
    this.response.pain_limbs = value.painData.painLimbs || undefined;
    this.response.diarrhea = value.diarrhea || undefined;
    this.response.throat = value.throat || undefined;
    this.response.dyspnea = value.dyspnea || undefined;
    this.response.fatigue = value.fatigue || undefined;
    return;
  }


  addCoronaScreenData(value: CoronaScreenResponse): void {
    console.log(value);
    this.response.corona_test = value.coronaTested || undefined;
    this.response.corona_positive = value.positiveTest || undefined;
    this.response.corona_date = value.testDate || undefined;
    return;
  }

  addConditionsScreenData(value: ConditionsScreenResponse): void {
    console.log(value);
  }

  public submitData(): void {
    // TODO send to API
  }
}
