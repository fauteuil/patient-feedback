import { MouseEvent, useCallback, useEffect, useState } from 'react';
// import { useForm } from "react-hook-form";
import { useForm, SubmitHandler } from 'react-hook-form';
import { PatientFeedbackFormData } from '.';
import { DEFAULT_PATIENT_FEEDBACK_FORM_DATA, FEEDBACK_FORM_COPY } from './constants';
import {
  ButtonGroupWrapper,
  FeedbackResponseDivider,
  FeedbackWrapper,
  FormButtonWrapper,
  FormFieldControlWrapper,
  FormFieldDescription,
  FormFieldError,
  FormFieldHeader,
  FormFieldInstructions,
  FormFieldWrapper,
  FormWrapper,
  InputStyled,
  SelectStyled,
  TextareaStyled,
} from './FeedbackForm.styled';
import { useFeedbackForm } from './useFeedbackForm';
import { TitleContainer } from '../../App.styled';

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

  // TODO: move to a service call and / or app state (React.Context) to break up form componments from feedback results.
  const [feedbackFormData, setFeedbackFormData] = useState<
    PatientFeedbackFormData & { complete: boolean }
  >({ ...DEFAULT_PATIENT_FEEDBACK_FORM_DATA, complete: false });

  // Pares and persist response data
  const onSubmit: SubmitHandler<PatientFeedbackFormData> = useCallback(feedbackFormData => {
    console.log('feedbackFormData', feedbackFormData);
    setFeedbackFormData({ ...feedbackFormData, complete: true });
    setFormStep(-1);
    // TODO: process form data for post to service/write to JSON in Bundle format
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
        <InputStyled
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
        <SelectStyled
          {...register('diagnosisExplanationSatisfaction', {
            required: `${FEEDBACK_FORM_COPY.diagnosisExplanationSatisfaction.title} is a required field`,
          })}
        >
          <option value={''} selected>
            -
          </option>
          <option value={'yes'}>Yes</option>
          <option value={'no'}>No</option>
        </SelectStyled>
        {errors.diagnosisExplanationSatisfaction ? (
          <FormFieldError>{errors.diagnosisExplanationSatisfaction.message}</FormFieldError>
        ) : null}
      </FormFieldControlWrapper>
      <FormFieldInstructions>
        {FEEDBACK_FORM_COPY.diagnosisExplanationComment.instructions}
      </FormFieldInstructions>
      <FormFieldControlWrapper>
        <TextareaStyled {...register('diagnosisExplanationComment')} />
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
        <TextareaStyled
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

  // TODO: abstract to hook
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

  // TODO: abstract to separate functional component
  function ButtonGroup() {
    return (
      <ButtonGroupWrapper>
        <FormButtonWrapper>
          <button disabled={formStep === 0} onClick={handleFormStepNavigation(formStep - 1)}>
            Back
          </button>
          <button
            data-testid='button-continue'
            disabled={formStep === formFields.length - 1}
            onClick={handleFormStepNavigation(formStep + 1)}
          >
            Continue
          </button>
          {formStep === formFields.length - 1 ? <InputStyled type='submit' /> : null}
        </FormButtonWrapper>
      </ButtonGroupWrapper>
    );
  }

  return (
    <>
      {/*
        TODO: refactor for dynamic parsing/rendering of feedback questions and flexible form fields rendered by question config.
      {feedbackQuestions.map(question => (
        <div key={question.id}>{question.name}</div>
      ))} */}

      {feedbackFormData.complete ? (
        // TODO: move to a dynamic feedback result display via question/format config
        <FeedbackWrapper>
          {/* <div>{JSON.stringify(feedbackFormData, undefined, 2)}</div> */}
          <FormFieldHeader>
            <TitleContainer>{FEEDBACK_FORM_COPY.feedbackCompletionHeader}</TitleContainer>
          </FormFieldHeader>
          <FeedbackResponseDivider />
          <FormFieldDescription>{FEEDBACK_FORM_COPY.recommendDoctor.title}</FormFieldDescription>
          <FormFieldInstructions>{feedbackFormData.recommendDoctor}</FormFieldInstructions>

          <FeedbackResponseDivider />

          <FormFieldDescription>
            {FEEDBACK_FORM_COPY.diagnosisExplanationSatisfaction.title}
          </FormFieldDescription>
          <FormFieldInstructions>
            {feedbackFormData.diagnosisExplanationSatisfaction}
          </FormFieldInstructions>
          {feedbackFormData.diagnosisExplanationComment ? (
            <FormFieldInstructions>
              "{feedbackFormData.diagnosisExplanationComment}"
            </FormFieldInstructions>
          ) : null}

          <FeedbackResponseDivider />

          <FormFieldDescription>{FEEDBACK_FORM_COPY.diagnosisResponse.title}</FormFieldDescription>
          <FormFieldInstructions>"{feedbackFormData.diagnosisResponse}"</FormFieldInstructions>
        </FeedbackWrapper>
      ) : (
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          {formFields}
          <ButtonGroup />
        </FormWrapper>
      )}
    </>
  );
}
