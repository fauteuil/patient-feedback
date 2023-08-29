import { useState, useEffect, useMemo } from 'react';
import { Bundle, Patient, Doctor, Diagnosis } from '../../types';
// TODO: move utils back into hook, improve hook stubbing/testing
import { getPatientInfo, getDoctorInfo, getDiagnosisInfo } from './feedback.utilities';

export function useFeedbackForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setBundle] = useState<Bundle>();
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
