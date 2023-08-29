import { getPatientInfo, getDoctorInfo } from './feedback.utilities';
import bundleStub from '../../test/test-data/patient-feedback-raw-data.json';
import { Doctor, Patient } from '../../types';

// Test bundle parsing logic
describe('Data parsing utilities', () => {
  it('should parse bundle data correctly to populate feedback form', () => {
    const patientInfo: Patient = getPatientInfo(bundleStub);
    const doctorInfo: Doctor = getDoctorInfo(bundleStub);

    expect(patientInfo.birthDate).toEqual('1955-01-06');

    expect(doctorInfo.name[0].given[0]).toEqual('Adam');
  });
});
