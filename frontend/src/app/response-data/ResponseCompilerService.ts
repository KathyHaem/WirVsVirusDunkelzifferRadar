import {Injectable} from '@angular/core';
import {FormResponse, PersonalData, WelcomeScreenResponse} from "./FormResponse";

@Injectable({
  providedIn: 'root'
})
export class ResponseCompilerService {
  private response: FormResponse;

  constructor() {
    this.response = new FormResponse();
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
}
