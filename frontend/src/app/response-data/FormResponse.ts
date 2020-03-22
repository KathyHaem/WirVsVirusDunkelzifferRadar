export class FormResponse {
  seenBefore: boolean;
  personalData?: PersonalData;
  testStatus?: TestStatus;
}

export interface WelcomeScreenResponse {
  seenBefore: string;
  personalData?: PersonalData;
}

export interface SymptomsScreenResponse {
  cough?: boolean;
  fever?: boolean;
  nose?: boolean;
  diarrhea?: boolean;
  throat?: boolean;
  dyspnea?: boolean;
  fatigue?: boolean;
  pain?: boolean;
  coughData?: CoughData;
  feverData?: FeverData;
  painData?: PainData;
}

export interface CoronaScreenResponse {
  coronaTested: boolean;
  positiveTest?: boolean;
  testDate?: string;
}

export interface ConditionsScreenResponse {
  existingConditions?: ExistingConditions;
}

export interface ExistingConditions {
  asthma?: boolean;
  allergies?: boolean;
  hypertension?: boolean;
  diabetes?: boolean;
  other?: boolean;
}

export interface PersonalData {
  age: number;
  gender: Gender;
  postcode: number;
}

export enum Gender {
  DIVERSE = "divers",
  FEMALE = "weiblich",
  MALE = "männlich"
}

export interface CoughData {
  coughDry?: boolean;
  coughProductive?: boolean;
  coughPainful?: boolean;
}

export interface PainData {
  painHead?: boolean;
  painLimbs?: boolean;
}

export interface FeverData {
  feverSuspected?: boolean;
  feverConfirmed?: boolean;
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
