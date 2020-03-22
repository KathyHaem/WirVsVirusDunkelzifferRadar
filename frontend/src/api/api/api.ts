export * from './questionnaire.service';
import { QuestionnaireService } from './questionnaire.service';
export * from './visualization.service';
import { VisualizationService } from './visualization.service';
export const APIS = [QuestionnaireService, VisualizationService];
