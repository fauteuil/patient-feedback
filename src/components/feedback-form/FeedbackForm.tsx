import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  // Appointment,
  Bundle,
  Diagnosis,
  Doctor,
  // FeedbackQuestion,
  Patient,
  PatientFeedback,
  // PatientFeedback,
} from '../../types';
// import { useForm } from "react-hook-form";
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { PatientFeedbackFormData } from '.';
import { DEFAULT_PATIENT_FEEDBACK_FORM_DATA, FEEDBACK_FORM_COPY } from './constants';
import { FormFieldInstructions, FormFieldWrapper } from './FeedbackForm.styled';

// function App() {
//   const { register } = useForm<UserInput>();
//   // ...
// }
// import { FeedbackQuestion } from "../../types";
// import { FORM_STEP, FormStep } from "./index.d.ts";

// TODO - abstract to a hook or client/service script for live data fetching
const fetchBundle = async () => {
  try {
    // TODO - update to Axios, et al for helper functionality. secure request config, etc
    const response = await fetch('./src/assets/test-data/patient-feedback-raw-data.json');
    const bundle: Bundle = await response.json();
    // const patientFeedback = bundle?.entry?.find(entryItem => {
    //   if (entryItem?.resource?.resourceType === 'PatientFeedback') {
    //     return entryItem?.resource;
    //   }
    // });
    // const questions = ((patientFeedback?.resource as PatientFeedback)?.questions ||
    //   []) as FeedbackQuestion[];
    // return questions;

    return bundle;
  } catch (error) {
    console.error('getData ERROR', error);
    // return [] as FeedbackQuestion[];
  }
};

// const getFeedbackQuestions = async () => {
//   try {
//     // TODO - update to Axios, et al for helper functionality. secure request header config, etc
//     const response = await fetch('./src/assets/test-data/patient-feedback-raw-data.json');
//     const bundle: Bundle = await response.json();
//     const patientFeedback = bundle?.entry?.find(entryItem => {
//       if (entryItem?.resource?.resourceType === 'PatientFeedback') {
//         return entryItem?.resource;
//       }
//     });
//     const questions = ((patientFeedback?.resource as PatientFeedback)?.questions ||
//       []) as FeedbackQuestion[];

//     return questions;
//   } catch (error) {
//     console.error('getData ERROR', error);
//     return [] as FeedbackQuestion[];
//   }
// };

/**
 * @todo - wrap individual resource parsing into useCallback()
 * @param {Bundle} bundle
 * @returns {Patient} patient
 */
function getPatientInfo(bundle?: Bundle): Patient {
  const patient = bundle?.entry?.find(entryItem => {
    if (entryItem?.resource?.resourceType === 'Patient') {
      return entryItem?.resource;
    }
  });
  return patient?.resource as Patient;
}

function getDoctorInfo(bundle?: Bundle): Doctor {
  const doctor = bundle?.entry?.find(entryItem => {
    if (entryItem?.resource?.resourceType === 'Doctor') {
      return entryItem?.resource;
    }
  });
  return doctor?.resource as Doctor;
}

function getDiagnosisInfo(bundle?: Bundle): Diagnosis {
  const diagnosis = bundle?.entry?.find(entryItem => {
    if (entryItem?.resource?.resourceType === 'Diagnosis') {
      return entryItem?.resource;
    }
  });
  return diagnosis?.resource as Diagnosis;
}

// function getAppointmentInfo(bundle?: Bundle): Appointment {
//   const appointment = bundle?.entry?.find(entryItem => {
//     if (entryItem?.resource?.resourceType === 'Appointment') {
//       return entryItem?.resource;
//     }
//   });
//   return appointment?.resource as Appointment;
// }

/**
 * For viewing the PatientFeedback resource as parsed from the bundle (stubbed)
 * @todo - abstract to service call and render dynamically
 * @param {Bundle} bundle
 * @returns {PatientFeedback} patientFeedback
 */
function getPatientFeedbackInfo(bundle?: Bundle): PatientFeedback {
  const patientfeedback = bundle?.entry?.find(entryItem => {
    if (entryItem?.resource?.resourceType === 'PatientFeedback') {
      return entryItem?.resource;
    }
  });
  return patientfeedback?.resource as PatientFeedback;
}

/**
 * Wizard for form completion
 * @returns form fields based upon wizard step
 * @todo: Abstract wizard, step-based component for reuse.
 */
export function FeedbackForm() {
  // const { methods, register } = useForm<PatientFeedbackFormData>();
  // const methods = useForm<PatientFeedbackFormData>();

  // const { reset, handleSubmit, watch } = methods;
  const {
    register,
    getFieldState,
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

  const [formStep, setFormStep] = useState<number>(0); //TOOD: manage form step by service response and/or app state library, e.g. ReactCcntext
  // const [feedbackQuestions, setFeedbackQuestions] = useState<FeedbackQuestion[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bundle, setBundle] = useState<Bundle>();
  const [patient, setPatient] = useState<Patient>();
  const [doctor, setDoctor] = useState<Doctor>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis>();
  // const [appointment, setAppointment] = useState<Appointment>(); // TODO: parse and display appointment data for more complete context to the questionnaire
  // const [patientFeedback, setPatientFeedback] = useState<PatientFeedback>();
  const [feedbackFormData, setFeedbackFormData] = useState<PatientFeedbackFormData>(
    DEFAULT_PATIENT_FEEDBACK_FORM_DATA,
  );

  // Pares and persist response data
  const onSubmit: SubmitHandler<PatientFeedbackFormData> = useCallback(feedbackFormData => {
    console.log('feedbackFormData', feedbackFormData);
    setFeedbackFormData(feedbackFormData);
    // const updatedPatientFeedback = { ...patientFeedback };
    // (updatedPatientFeedback?.questions || []).forEach(question => { });
  }, []);

  // Display values
  const patientFirstName = useMemo(() => {
    return (patient?.name[0].given || ['[Patient First Name]']).join(' ');
  }, [patient?.name]);
  const doctorLastName = useMemo(() => {
    return doctor?.name[0].family || '[Docotor Last Name]';
  }, [doctor?.name]);
  const diagnosisTitle = useMemo(() => {
    return (
      diagnosis?.code.coding.map(eachDiagnosis => eachDiagnosis.name).join(', ') || '[Diagnosis]'
    );
  }, [diagnosis?.code.coding]);

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

  useEffect(() => {
    fetchBundle().then(bundleResponse => {
      // console.log('data', data);
      console.log('bundle', bundleResponse);
      setBundle(bundleResponse);
      setPatient(getPatientInfo(bundleResponse));
      setDoctor(getDoctorInfo(bundleResponse));
      // setAppointment(getAppointmentInfo(bundle));
      setDiagnosis(getDiagnosisInfo(bundleResponse));
    });
  }, []);

  // const formFieldKeys = ['recommendDoctor', 'diagnosisExplanationSatisfaction', 'diagnosisResponse'];

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
        <option value={''} selected>-</option>
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

    // let formError = false;

    console.log('event', event);
    // const triggered = await trigger();
    // trigger();
    clearErrors();

    // trigger('recommendDoctor');
    // if (triggered) { return; }
    const newIndex =
      Math.max(Math.min(nextFormStepId, formFields.length - 1), 0) % formFields.length;
    // trigger();

    switch (formStep) {
      case 0: {
        // const recommendDoctorState = getFieldState('recommendDoctor');
        // if (!recommendDoctorState.isTouched) {
        //   return;
        // }
        // console.log('recommendDoctorInvalid', invalid);
        await trigger('recommendDoctor');
        // if (errors['recommendDoctor'])
        //   return;
        break;
      }
      case 1: {
        setFocus('diagnosisExplanationSatisfaction');
        const diagnosisExplanationSatisfactionState = getFieldState('recommendDoctor');
        await trigger('diagnosisExplanationSatisfaction');
        break;
      }
      case 2: {
        setFocus('diagnosisResponse');
        await trigger('diagnosisResponse');
        break;
      }
      default:
        clearErrors();
    }

    if (Object.values(errors).length) {
      console.log('triggered errors', errors);
      // if (errors['recommendDoctor'])
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
      Results:{JSON.stringify(feedbackFormData, undefined, 2)}
    </>
  );
}
