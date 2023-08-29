import { useState, useEffect, useMemo } from 'react';
import { Bundle, Patient, Doctor, Diagnosis, PatientFeedback } from '../../types';

export function useFeedbackForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bundle, setBundle] = useState<Bundle>();
  const [patient, setPatient] = useState<Patient>();
  const [doctor, setDoctor] = useState<Doctor>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis>();
  // const [appointment, setAppointment] = useState<Appointment>(); // TODO: parse and display appointment data for more complete context to the questionnaire
  // const [patientFeedback, setPatientFeedback] = useState<PatientFeedback>();

  const fetchBundle = async () => {
    try {
      // TODO - update to Axios, et al for helper functionality. secure request config, etc
      const response = await fetch('./src/assets/test-data/patient-feedback-raw-data.json');
      const bundle: Bundle = await response.json();
      return bundle;
    } catch (error) {
      console.error('getData ERROR', error);
    }
  };

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
   * For viewing the PatientFeedback resource as parsed from the bundle (stubbed into `src/assets/test-data/patient-feedback-raw-data.json` data JSON to illustrate)
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

  // Fetch and parse bundle
  useEffect(() => {
    fetchBundle().then(bundleResponse => {
      console.log('bundle', bundleResponse);
      setBundle(bundleResponse);
      setPatient(getPatientInfo(bundleResponse));
      setDoctor(getDoctorInfo(bundleResponse));
      // setAppointment(getAppointmentInfo(bundle));
      setDiagnosis(getDiagnosisInfo(bundleResponse));
    });
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

  return {
    diagnosis,
    diagnosisTitle,
    doctor,
    doctorLastName,
    fetchBundle,
    getPatientInfo,
    patient,
    patientFirstName,
  };
}
