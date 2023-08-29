import { Bundle, Patient, Doctor, Diagnosis, PatientFeedback } from '../../types';

/**
 * @todo - wrap individual resource parsing into useCallback()
 * @param {Bundle} bundle
 * @returns {Patient} patient
 */
export function getPatientInfo(bundle?: Bundle): Patient {
  const patient = bundle?.entry?.find(entryItem => {
    if (entryItem?.resource?.resourceType === 'Patient') {
      return entryItem?.resource;
    }
  });
  return patient?.resource as Patient;
}

export function getDoctorInfo(bundle?: Bundle): Doctor {
  const doctor = bundle?.entry?.find(entryItem => {
    if (entryItem?.resource?.resourceType === 'Doctor') {
      return entryItem?.resource;
    }
  });
  return doctor?.resource as Doctor;
}

export function getDiagnosisInfo(bundle?: Bundle): Diagnosis {
  const diagnosis = bundle?.entry?.find(entryItem => {
    if (entryItem?.resource?.resourceType === 'Diagnosis') {
      return entryItem?.resource;
    }
  });
  return diagnosis?.resource as Diagnosis;
}

// export function getAppointmentInfo(bundle?: Bundle): Appointment {
//   const appointment = bundle?.entry?.find(entryItem => {
//     if (entryItem?.resource?.resourceType === 'Appointment') {
//       return entryItem?.resource;
//     }
//   });
//   return appointment?.resource as Appointment;
// }

/**
 * For viewing the PatientFeedback resource as parsed from the bundle (stubbed into `src/assets/test-data/patient-feedback-raw-data.json` data JSON to illustrate)
 * @todo - abstract to service call and render dynamically
 * @param {Bundle} bundle
 * @returns {PatientFeedback} patientFeedback
 */
export function getPatientFeedbackInfo(bundle?: Bundle): PatientFeedback {
  const patientfeedback = bundle?.entry?.find(entryItem => {
    if (entryItem?.resource?.resourceType === 'PatientFeedback') {
      return entryItem?.resource;
    }
  });
  return patientfeedback?.resource as PatientFeedback;
}
