export type FormStep =
  | 'RecommendDoctor'
  | 'DiagnosisExplanation'
  | 'DiagnosisFeedback';

export const FORM_STEP: Record<string, FormStep> = {
  1: 'RecommendDoctor',
  2: 'DiagnosisExplanation',
  3: 'DiagnosisFeedback',
};
