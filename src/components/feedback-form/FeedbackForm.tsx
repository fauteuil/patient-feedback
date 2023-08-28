import { useEffect, useMemo, useState } from 'react';
import {
  // Appointment,
  Bundle,
  Diagnosis,
  Doctor,
  // FeedbackQuestion,
  Patient,
  // PatientFeedback,
} from '../../types';
// import { useForm } from "react-hook-form";
import { useForm, SubmitHandler } from 'react-hook-form';
import { PatientFeedbackFormData } from '.';
import { FormFieldWrapper } from './FormFieldWrapper';
import { FEEDBACK_FORM_COPY } from './constants';

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
 * @todo - wrap in useCallback()
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
 * For viewing results saved to the bundle (stubbed)
 * @todo - abstract to service call and render dynamically
 * @param {Bundle} bundle
 * @returns {PatientFeedback} patientFeedback
 */
// function getPatientFeedbackInfo(bundle?: Bundle): PatientFeedback {
//   const patientfeedback = bundle?.entry?.find(entryItem => {
//     if (entryItem?.resource?.resourceType === 'PatientFeedback') {
//       return entryItem?.resource;
//     }
//   });
//   return patientfeedback?.resource as PatientFeedback;
// }

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
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFeedbackFormData>();

  const onSubmit: SubmitHandler<PatientFeedbackFormData> = data => console.log(data);

  const [formStep, setFormStep] = useState<string>(''); //TOOD: manage form step by service response and/or app state library, e.g. ReactCcntext
  // const [feedbackQuestions, setFeedbackQuestions] = useState<FeedbackQuestion[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bundle, setBundle] = useState<Bundle>();
  const [patient, setPatient] = useState<Patient>();
  const [doctor, setDoctor] = useState<Doctor>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis>();
  // const [appointment, setAppointment] = useState<Appointment>(); // TODO: parse and display  appointment data for better context
  // const [patientFeedback, setPatientFeedback] = useState<PatientFeedback>();

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

  const handleFormStepNavigation = (formStepId: string) => () => {
    setFormStep(formStepId);
  };

  // Fetch data to populate the form
  useEffect(() => {
    // const populateFields = () => {

    // }
    // populateFields();
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

  // useEffect(() => {
  //   // const populateFields = () => {

  //   // }
  //   // populateFields();
  //   getFeedbackQuestions().then(questions => {
  //     // console.log('data', data);
  //     console.log('questions', questions);
  //     setFeedbackQuestions(questions);
  //   });
  // }, []);

  return (
    <>
      <div>Form</div>
      {/* {formStep} */}
      feedbackQuestions
      {/*
        TODO: dynamic parsing/rendering of feedback questions and flexible form fields by question config.
      {feedbackQuestions.map(question => (
        <div key={question.id}>{question.name}</div>
      ))} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFieldWrapper>
          <div>
            {FEEDBACK_FORM_COPY.recommendDoctor.description(patientFirstName, doctorLastName)}
          </div>
          <div>{FEEDBACK_FORM_COPY.recommendDoctor.instructions}</div>
          <input
            type='number'
            max={10}
            min={1}
            {...register('recommendDoctor', { required: `${FEEDBACK_FORM_COPY.recommendDoctor.title} is a required field` })}
          />
          {errors.recommendDoctor ? <div>{errors.recommendDoctor.message}</div> : null}
        </FormFieldWrapper>
        <FormFieldWrapper>
          <div>{FEEDBACK_FORM_COPY.diagnosisExplanation.description(diagnosisTitle)}</div>
          <div>{FEEDBACK_FORM_COPY.diagnosisExplanation.instructions(doctorLastName)}</div>
          <input {...register('diagnosisExplanation', { required: `${FEEDBACK_FORM_COPY.diagnosisExplanation.title} is a required field` })} />
          {errors.diagnosisExplanation ? <div>{errors.diagnosisExplanation.message}</div> : null}
        </FormFieldWrapper>
        <FormFieldWrapper>
          <div>{FEEDBACK_FORM_COPY.diagnosisExplanationComment.instructions}</div>
          <textarea {...register('diagnosisExplanationComment')} />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <div>{FEEDBACK_FORM_COPY.diagnosisResponse.instructions(diagnosisTitle)}</div>
          <textarea {...register('diagnosisResponse', { required: `${FEEDBACK_FORM_COPY.diagnosisResponse.title} is a required field` })} />
          {errors.diagnosisResponse ? <div>{errors.diagnosisResponse.message}</div> : null}
        </FormFieldWrapper>

        <input type='submit' />
      </form>
      <button onClick={handleFormStepNavigation(formStep)}>Back</button>
      <button>Continue</button>
    </>
  );
}
