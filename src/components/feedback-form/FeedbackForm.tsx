import { MouseEvent, useCallback, useEffect, useState } from 'react';
// import { useForm } from "react-hook-form";
import { useForm, SubmitHandler } from 'react-hook-form';
import { PatientFeedbackFormData } from '.';
import { DEFAULT_PATIENT_FEEDBACK_FORM_DATA, FEEDBACK_FORM_COPY } from './constants';
import { FormFieldInstructions, FormFieldWrapper } from './FeedbackForm.styled';
import { useFeedbackForm } from './useFeedbackForm';

/**
 * Wizard for form completion
 * @returns form fields based upon wizard step
 * @todo: Abstract wizard, step-based component for reuse.
 */
export function FeedbackForm() {
  const {
    register,
    // getFieldState,
    handleSubmit,
    formState: { errors },
    trigger,
    clearErrors,
    setFocus,
  } = useForm<PatientFeedbackFormData>({
    mode: 'onTouched',
    defaultValues: {
      recommendDoctor: undefined,
      diagnosisExplanationSatisfaction: undefined,
      diagnosisResponse: undefined,
    },
  });

  const { diagnosisTitle, doctorLastName, patientFirstName } = useFeedbackForm();

  const [formStep, setFormStep] = useState<number>(0); //TOOD: manage form step by service response and/or app state library, e.g. ReactCcntext
  const [feedbackFormData, setFeedbackFormData] = useState<
    PatientFeedbackFormData & { complete: boolean }
  >({ ...DEFAULT_PATIENT_FEEDBACK_FORM_DATA, complete: false });

  // Pares and persist response data
  const onSubmit: SubmitHandler<PatientFeedbackFormData> = useCallback(feedbackFormData => {
    console.log('feedbackFormData', feedbackFormData);
    setFeedbackFormData({ ...feedbackFormData, complete: true });
    setFormStep(-1);
    // const updatedPatientFeedback = { ...patientFeedback };
    // (updatedPatientFeedback?.questions || []).forEach(question => { });
  }, []);

  // Fetch data to specify context for the form fields.
  useEffect(() => {
    switch (formStep) {
      case 0: {
        setFocus('recommendDoctor');
        break;
      }
      case 1: {
        setFocus('diagnosisExplanationSatisfaction');
        break;
      }
      case 2: {
        setFocus('diagnosisResponse');
        break;
      }
      default:
        setFocus('recommendDoctor');
    }

    // setFocus('recommendDoctor');
  }, [formStep, setFocus]);

  const formFields = [
    <FormFieldWrapper key='recommendDoctor'>
      <FormFieldInstructions>
        {FEEDBACK_FORM_COPY.recommendDoctor.description(patientFirstName, doctorLastName)}
      </FormFieldInstructions>
      <FormFieldInstructions>
        {FEEDBACK_FORM_COPY.recommendDoctor.instructions}
      </FormFieldInstructions>
      <input
        type='number'
        max={10}
        min={1}
        {...register('recommendDoctor', {
          required: `${FEEDBACK_FORM_COPY.recommendDoctor.title} is a required field`,
        })}
      />
      {errors.recommendDoctor ? <div>{errors.recommendDoctor.message}</div> : null}
    </FormFieldWrapper>,
    <FormFieldWrapper key='diagnosisExplanationSatisfaction'>
      <FormFieldInstructions>
        {FEEDBACK_FORM_COPY.diagnosisExplanationSatisfaction.description(diagnosisTitle)}
      </FormFieldInstructions>
      <FormFieldInstructions>
        {FEEDBACK_FORM_COPY.diagnosisExplanationSatisfaction.instructions(doctorLastName)}
      </FormFieldInstructions>
      <select
        {...register('diagnosisExplanationSatisfaction', {
          required: `${FEEDBACK_FORM_COPY.diagnosisExplanationSatisfaction.title} is a required field`,
        })}
      >
        <option value={''} selected>
          -
        </option>
        <option value={'yes'}>Yes</option>
        <option value={'no'}>No</option>
      </select>
      {errors.diagnosisExplanationSatisfaction ? (
        <div>{errors.diagnosisExplanationSatisfaction.message}</div>
      ) : null}
      {/* <FormFieldWrapper > */}
      <FormFieldInstructions>
        {FEEDBACK_FORM_COPY.diagnosisExplanationComment.instructions}
      </FormFieldInstructions>
      <textarea {...register('diagnosisExplanationComment')} />
      {/* </FormFieldWrapper> */}
    </FormFieldWrapper>,
    <FormFieldWrapper key='diagnosisResponse'>
      <FormFieldInstructions>
        {FEEDBACK_FORM_COPY.diagnosisResponse.description}
      </FormFieldInstructions>
      <FormFieldInstructions>
        {FEEDBACK_FORM_COPY.diagnosisResponse.instructions(diagnosisTitle)}
      </FormFieldInstructions>
      <textarea
        {...register('diagnosisResponse', {
          required: `${FEEDBACK_FORM_COPY.diagnosisResponse.title} is a required field`,
        })}
      />
      {errors.diagnosisResponse ? <div>{errors.diagnosisResponse.message}</div> : null}
    </FormFieldWrapper>,
  ];

  const handleFormStepNavigation = (nextFormStepId: number) => async (
    event: MouseEvent<HTMLElement>,
  ) => {
    event.preventDefault();

    console.log('event', event);
    clearErrors();

    const newIndex =
      Math.max(Math.min(nextFormStepId, formFields.length - 1), 0) % formFields.length;

    switch (formStep) {
      case 0: {
        await trigger('recommendDoctor');
        break;
      }
      case 1: {
        await trigger('diagnosisExplanationSatisfaction');
        break;
      }
      case 2: {
        await trigger('diagnosisResponse');
        break;
      }
      default:
        clearErrors();
    }

    if (Object.values(errors).length) {
      console.log('form errors', errors);
      return;
    }
    console.log('newFormStepIndex', newIndex);
    setFormStep(newIndex);
  };

  return (
    <>
      {/*
        TODO: refactor for dynamic parsing/rendering of feedback questions and flexible form fields rendered by question config.
      {feedbackQuestions.map(question => (
        <div key={question.id}>{question.name}</div>
      ))} */}


      {feedbackFormData.complete ? (<div>{FEEDBACK_FORM_COPY.feedbackCompletionHeader}
        <div>
          {JSON.stringify(feedbackFormData, undefined, 2)}
        </div>
      </div>) :

        <form onSubmit={handleSubmit(onSubmit)}>

          {formFields.map((FieldComponent, index) => {
            return formStep === index ? (
              <>
                {FieldComponent}
                <button disabled={formStep === 0} onClick={handleFormStepNavigation(formStep - 1)}>
                  Back
                </button>
                <button
                  disabled={formStep === formFields.length - 1}
                  onClick={handleFormStepNavigation(formStep + 1)}
                >
                  Continue
                </button>
              </>
            ) : (
              <></>
            );
          })}
          {formStep === formFields.length - 1 ? <input type='submit' /> : null}
        </form>
      }
    </>
  );
}
