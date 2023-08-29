import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
// import { useForm } from "react-hook-form";
import { useForm, SubmitHandler } from 'react-hook-form';
import { PatientFeedbackFormData } from '.';
import { DEFAULT_PATIENT_FEEDBACK_FORM_DATA, FEEDBACK_FORM_COPY } from './constants';
import {
  FormButtonWrapper,
  FormFieldControlWrapper,
  FormFieldDescription,
  FormFieldError,
  FormFieldHeader,
  // FormFieldCarouselWrapper,
  FormFieldInstructions,
  FormFieldWrapper,
  FormViewWrapper,
  FormWrapper,
} from './FeedbackForm.styled';
import { useFeedbackForm } from './useFeedbackForm';
// import { Selected } from '../../types';

/**
 * Wizard for form completion
 * @returns form fields based upon wizard step
 * @todo: Abstract wizard, step-based component for reuse.
 */
export function FeedbackForm() {
  const {
    register,
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
  }, [formStep, setFocus]);

  // const formFields = useMemo(() => {
  const formFields = [
    <FormFieldWrapper key='recommendDoctor' selected={formStep === 0}>
      <FormFieldHeader>
        <FormFieldDescription>
          {FEEDBACK_FORM_COPY.recommendDoctor.description(patientFirstName, doctorLastName)}
        </FormFieldDescription>
      </FormFieldHeader>
      <FormFieldInstructions>
        {FEEDBACK_FORM_COPY.recommendDoctor.instructions}
      </FormFieldInstructions>
      <FormFieldControlWrapper>
        <input
          type='number'
          max={10}
          min={1}
          {...register('recommendDoctor', {
            required: `${FEEDBACK_FORM_COPY.recommendDoctor.title} is a required field`,
            min: 1,
            max: 10,
            validate: v => v >= 1 && v <= 10,
          })}
        />
        {errors.recommendDoctor ? (
          <FormFieldError>{errors.recommendDoctor.message}</FormFieldError>
        ) : null}
      </FormFieldControlWrapper>
    </FormFieldWrapper>,
    <FormFieldWrapper key='diagnosisExplanationSatisfaction' selected={formStep === 1}>
      <FormFieldHeader>
        <FormFieldDescription>
          {FEEDBACK_FORM_COPY.diagnosisExplanationSatisfaction.description(diagnosisTitle)}
        </FormFieldDescription>
      </FormFieldHeader>
      <FormFieldInstructions>
        {FEEDBACK_FORM_COPY.diagnosisExplanationSatisfaction.instructions(doctorLastName)}
      </FormFieldInstructions>
      <FormFieldControlWrapper>
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
          <FormFieldError>{errors.diagnosisExplanationSatisfaction.message}</FormFieldError>
        ) : null}
      </FormFieldControlWrapper>
      <FormFieldInstructions>
        {FEEDBACK_FORM_COPY.diagnosisExplanationComment.instructions}
      </FormFieldInstructions>
      <FormFieldControlWrapper>
        <textarea {...register('diagnosisExplanationComment')} />
      </FormFieldControlWrapper>
    </FormFieldWrapper>,
    <FormFieldWrapper key='diagnosisResponse' selected={formStep === 2}>
      <FormFieldHeader>
        <FormFieldDescription>
          {FEEDBACK_FORM_COPY.diagnosisResponse.description}
        </FormFieldDescription>
        <FormFieldInstructions>
          {FEEDBACK_FORM_COPY.diagnosisResponse.instructions(diagnosisTitle)}
        </FormFieldInstructions>
      </FormFieldHeader>
      <FormFieldControlWrapper>
        <textarea
          {...register('diagnosisResponse', {
            required: `${FEEDBACK_FORM_COPY.diagnosisResponse.title} is a required field`,
          })}
        />
        {errors.diagnosisResponse ? (
          <FormFieldError>{errors.diagnosisResponse.message}</FormFieldError>
        ) : null}
      </FormFieldControlWrapper>
    </FormFieldWrapper>,
  ];
  // }, [
  //   diagnosisTitle,
  //   doctorLastName,
  //   errors.diagnosisExplanationSatisfaction,
  //   errors.diagnosisResponse,
  //   errors.recommendDoctor,
  //   formStep,
  //   patientFirstName,
  //   register,
  // ]);

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

      {feedbackFormData.complete ? (
        <div>
          {FEEDBACK_FORM_COPY.feedbackCompletionHeader}
          <div>{JSON.stringify(feedbackFormData, undefined, 2)}</div>
        </div>
      ) : (
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          {/* <FormViewWrapper> */}
          {/* <FormFieldCarouselWrapper offset={(formStep + 1) * -3}> */}
          {/*
            {formFields.map((FieldComponent, index) => {
              return formStep === index ? <>{FieldComponent}</> : <>{FieldComponent}</>;
            })} */}
          {formFields}
          {/* </FormFieldCarouselWrapper> */}
          {/* </FormViewWrapper> */}
          <FormButtonWrapper>
            <button disabled={formStep === 0} onClick={handleFormStepNavigation(formStep - 1)}>
              Back
            </button>
            <button
              disabled={formStep === formFields.length - 1}
              onClick={handleFormStepNavigation(formStep + 1)}
            >
              Continue
            </button>
            {formStep === formFields.length - 1 ? <input type='submit' /> : null}
          </FormButtonWrapper>
        </FormWrapper>
      )}
    </>
  );
}
