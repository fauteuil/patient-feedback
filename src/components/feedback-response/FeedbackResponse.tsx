import { TitleContainer } from '../../App.styled';
import { FEEDBACK_FORM_COPY } from '../feedback-form/constants';
import {
  FeedbackWrapper,
  FeedbackResponseHeader,
  FeedbackResponseDivider,
  FeedbackResponseDescription,
  FeedbackResponseInstructions,
  FeedbackResponseWrapper,
  FeedbackResponseValue,
} from './FeedbackResponse.styled';

import { PatientFeedbackFormData } from '../feedback-form';

type FeedbackResponseProps = {
  responseContext: { diagnosisTitle: string; doctorLastName: string; patientFirstName: string };
  responseData: PatientFeedbackFormData;
};

export function FeedbackResponse({ responseContext, responseData }: FeedbackResponseProps) {
  const { diagnosisTitle, doctorLastName, patientFirstName } = responseContext;
  return (
    <FeedbackWrapper>
      <FeedbackResponseWrapper>
        <FeedbackResponseHeader>
          <TitleContainer>{FEEDBACK_FORM_COPY.feedbackCompletionHeader}</TitleContainer>
        </FeedbackResponseHeader>
        {/* <FeedbackResponseDescription>
          {FEEDBACK_FORM_COPY.recommendDoctor.title}
        </FeedbackResponseDescription> */}
        <FeedbackResponseDescription>
          {FEEDBACK_FORM_COPY.recommendDoctor.description(patientFirstName, doctorLastName)}
        </FeedbackResponseDescription>
        <FeedbackResponseDivider />
        <FeedbackResponseInstructions>
          {FEEDBACK_FORM_COPY.recommendDoctor.instructions}
        </FeedbackResponseInstructions>
        <FeedbackResponseValue>{responseData.recommendDoctor}</FeedbackResponseValue>
      </FeedbackResponseWrapper>

      <FeedbackResponseWrapper>
        {/* <FeedbackResponseDescription>
          {FEEDBACK_FORM_COPY.diagnosisExplanationSatisfaction.title}
        </FeedbackResponseDescription> */}
        <FeedbackResponseDescription>
          {FEEDBACK_FORM_COPY.diagnosisExplanationSatisfaction.description(diagnosisTitle)}
        </FeedbackResponseDescription>
        <FeedbackResponseDivider />
        <FeedbackResponseInstructions>
          {FEEDBACK_FORM_COPY.diagnosisExplanationSatisfaction.instructions(doctorLastName)}
        </FeedbackResponseInstructions>
        <FeedbackResponseValue>
          {responseData.diagnosisExplanationSatisfaction}
        </FeedbackResponseValue>
        {responseData.diagnosisExplanationComment ? (
          <>
            <FeedbackResponseInstructions>
              {FEEDBACK_FORM_COPY.diagnosisExplanationComment.instructions}
            </FeedbackResponseInstructions>
            <FeedbackResponseValue>
              "{responseData.diagnosisExplanationComment}"
            </FeedbackResponseValue>
          </>
        ) : null}
      </FeedbackResponseWrapper>

      <FeedbackResponseWrapper>
        {/* <FeedbackResponseDescription>
          {FEEDBACK_FORM_COPY.diagnosisResponse.title}
        </FeedbackResponseDescription> */}
        <FeedbackResponseDescription>
          {FEEDBACK_FORM_COPY.diagnosisResponse.instructions(diagnosisTitle)}
        </FeedbackResponseDescription>
        <FeedbackResponseDivider />
        <FeedbackResponseValue>"{responseData.diagnosisResponse}"</FeedbackResponseValue>
      </FeedbackResponseWrapper>
    </FeedbackWrapper>
  );
}
