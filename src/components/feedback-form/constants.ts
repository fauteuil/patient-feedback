// TODO - Add types for dynamic question/form field population.

import { PatientFeedbackFormData } from '.';

// TODO - Add multiple versions of this or similar script for i18n considerations.
export const FEEDBACK_FORM_COPY = {
  recommendDoctor: {
    title: 'Doctor Recommendation',
    description: (patientFirstName: string, doctorLastName: string) =>
      `Hi ${patientFirstName}, on a scale of 1-10, would you recommend Dr ${doctorLastName} to a friend or family member?`,
    instructions: '1 = Would not recommend, 10 = Would strongly recommend',
  },
  diagnosisExplanationSatisfaction: {
    title: 'Explanation of Diagnosis Satisfaction',
    description: (diagnosis: string) => `Thank you. You were diagnosed with '${diagnosis}'.`,
    instructions: (doctorLastName: string) =>
      `Did Dr ${doctorLastName} explain how to manage this diagnosis in a way you could understand?`,
  },
  diagnosisExplanationComment: {
    title: 'Explanation of Diagnosis Comments',
    instructions: `Additional Comments`,
  },
  diagnosisResponse: {
    title: 'General Diagnosis Feedback',
    description: 'We appreciate the feedback, one last question:',
    instructions: (diagnosis: string) => `How do you feel about being diagnosed with ${diagnosis}?`,
  },
  feedbackCompletionHeader: 'Thanks again! Here’s what we heard:',
};

export const DEFAULT_PATIENT_FEEDBACK_FORM_DATA: PatientFeedbackFormData = {
  recommendDoctor: 0,
  diagnosisExplanationSatisfaction: '',
  diagnosisExplanationComment: '',
  diagnosisResponse: 'string',
};
