export class FormResponse {
  age: number; // todo or age range?
  gender: Gender;
  postcode: string;
  symptoms: Symptoms;
  testStatus: TestStatus;
}

export enum Gender {
  DIVERSE = "divers",
  FEMALE = "weiblich",
  MALE = "männlich"
}

export interface Symptoms {
  cough?: Cough[];
  fever?: Fever;
  sniffles?: Sniffles[];
  pain?: Pain[];
  diarrhea?: boolean;
  throat?: Throat[];
  shortOfBreath?: boolean;
  exhaustion?: boolean;
}

export enum Cough {
  DRY,
  PHLEGMY,
  PAINFUL
}

export interface Fever {
  confirmed: boolean;
  temperature?: number;
}

export enum Sniffles {
  BLOCKED_NOSE,
  RUNNY_NOSE,
  SNEEZING
}

export enum Pain {
  HEADACHE,
  ACHING_LIMBS
}

export enum Throat {
  TROUBLE_SWALLOWING,
  SORENESS
}

export enum TestStatus { // todo depends what exactly the others want
  NOT_TESTED,
  NEGATIVE,
  POSITIVE,
}
