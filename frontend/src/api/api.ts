export * from './questionnaire.service';
import { QuestionnaireService } from './questionnaire.service';
export * from './test.service';
import { TestService } from './test.service';
export * from './visualization.service';
import { VisualizationService } from './visualization.service';
export const APIS = [QuestionnaireService, TestService, VisualizationService];
