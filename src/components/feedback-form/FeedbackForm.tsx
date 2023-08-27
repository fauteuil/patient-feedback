import { useEffect, useState } from 'react';
import { Bundle, FeedbackQuestion, PatientFeedback } from '../../types';
// import { FeedbackQuestion } from "../../types";
// import { FORM_STEP, FormStep } from "./index.d.ts";

// TODO - abstract to a hook or client/service script for live data fetching
const getFeedbackQuestions = async () => {
  try {
    // TODO - update to Axios, et al for helper functionality. secure request config, etc
    const response = await fetch('./src/assets/test-data/patient-feedback-raw-data.json');
    const bundle: Bundle = await response.json();
    const patientFeedback = bundle?.entry?.find(entryItem => {
      if (entryItem?.resource?.resourceType === 'PatientFeedback') {
        return entryItem?.resource;
      }
    });
    const questions = ((patientFeedback?.resource as PatientFeedback)?.questions ||
      []) as FeedbackQuestion[];

    return questions;
  } catch (error) {
    console.error('getData ERROR', error);
    return [] as FeedbackQuestion[];
  }
};

/**
 * Wizard for form completion
 * @returns form fields based upon wizard step
 * @todo: Abstract wizard, step-based component for reuse.
 */
export function FeedbackForm() {
  const [formStep, setFormStep] = useState<string>(''); //TOOD: manage form step by service response and/or app state library, e.g. ReactCcntext
  const [feedbackQuestions, setFeedbackQuestions] = useState<FeedbackQuestion[]>([]);

  const handleFormStepNavigation = (formStepId: string) => () => {
    setFormStep(formStepId);
  };

  // Fetch data to populate the form
  useEffect(() => {
    // const populateFields = () => {

    // }
    // populateFields();
    getFeedbackQuestions().then(questions => {
      // console.log('data', data);
      console.log('questions', questions);
      setFeedbackQuestions(questions);
    });
  }, []);

  return (
    <>
      <div>Form</div>
      {/* {formStep} */}
      feedbackQuestions
      {feedbackQuestions.map(question => (
        <div key={question.id}>{question.name}</div>
      ))}
      <button onClick={handleFormStepNavigation(formStep)}>Back</button>
      <button>Continue</button>
    </>
  );
}
