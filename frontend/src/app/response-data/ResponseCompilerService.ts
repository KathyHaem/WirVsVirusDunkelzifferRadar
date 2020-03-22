import {Injectable} from '@angular/core';
import {
  ConditionsScreenResponse,
  CoronaScreenResponse,
  FormResponse,
  PersonalData,
  SymptomsScreenResponse,
  WelcomeScreenResponse
} from "./FormResponse";

@Injectable({
  providedIn: 'root'
})
export class ResponseCompilerService {
  private response: FormResponse;

  constructor() {
    this.response = new FormResponse();
  }

  public isFirstTime(): boolean {
    if (this.response.seenBefore == undefined) return true;
    else return !this.response.seenBefore;
  }

  addWelcomeScreenData(value: WelcomeScreenResponse): void {
    console.log(value);
    this.response.seenBefore = value.seenBefore;
    if (value.personalData) {
      this.response.personalData = <PersonalData>{};
      this.response.personalData.age = value.personalData.age || undefined;
      this.response.personalData.gender = value.personalData.gender || undefined;
      this.response.personalData.postcode = value.personalData.postcode || undefined;
      return;
    }
    this.response.personalData = undefined;
  }

  addSymptomsScreenData(value: SymptomsScreenResponse): void {
    console.log(value);
    if (value.symptoms) {
      this.response.cough = ;
      this.response.cough_dry = ;
      this.response.cough_productive = ;
      this.response.cough_painful = ;
      this.response.fever = ;
      this.response.fever_suspected = ;
      this.response.fever_confirmed = ;
      this.response.nose_affected = ;
      this.response.pain = ;
      this.response.pain_head = ;
      this.response.pain_limbs = ;
      this.response.diarrhea = ;
      this.response.throat = ;
      this.response.dyspnea = ;
      this.response.fatigue = ;
    }
  }


  addCoronaScreenData(value: CoronaScreenResponse): void {
    console.log(value);
  }

  addConditionsScreenData(value: ConditionsScreenResponse): void {
    console.log(value);
  }
}
