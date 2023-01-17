import { PostSubmissionAction } from '@ohri/openmrs-ohri-form-engine-lib';
import { fetchPatientIdentifiers, saveIdentifier } from '../../api/api';
import { Patient, PatientIdentifier } from '../../api/types';
import { pTrackerIdConcept, PTrackerIdentifierType } from '../../constants';

export const PTrackerSubmissionAction: PostSubmissionAction = {
  applyAction: async function ({ patient, encounters, sessionMode }) {
    const encounter = encounters[0];
    const encounterLocation = encounter.location['uuid'];

    // Don't do post submission if action is view
    if (sessionMode === 'view') {
      return;
    }

    const inComingPTrackerID = encounter.obs.find(
      (observation) => observation.concept.uuid === pTrackerIdConcept,
    ).value;
    const patientUuid = patient['id'];

    const patientIdentifiers = await fetchPatientIdentifiers(patientUuid);
    const exixtingPTrackers = patientIdentifiers.filter((id) => id.identifierType.uuid === PTrackerIdentifierType);
    if (exixtingPTrackers.some((ptracker) => ptracker.identifier === inComingPTrackerID)) {
      return;
    }

    //add current ptracker to identities
    const currentPTrackerObject: PatientIdentifier = {
      identifier: inComingPTrackerID,
      identifierType: PTrackerIdentifierType,
      location: encounterLocation,
      preferred: false,
    };
    const identifierPostResponse = await saveIdentifier(currentPTrackerObject, patientUuid);
  },
};

export default PTrackerSubmissionAction;
