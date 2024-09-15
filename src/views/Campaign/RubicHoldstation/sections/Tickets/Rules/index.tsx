import Modal from '@/components/Modal';
import {
  StyledContainer,
  StyledList,
  StyledListItem,
  StyledSection,
  StyledText,
  StyledTitle
} from '@/views/Campaign/RubicHoldstation/sections/Tickets/Rules/styles';

const Rules = (props: Props) => {
  const { visible, onClose } = props;

  return (
    <Modal
      display={visible}
      title="Grand Lotto Overview"
      width={704}
      onClose={onClose}
      style={{
        borderRadius: 12,
        background: '#1F2229',
        border: '1px solid #333648'
      }}
      headerStyle={{
        fontStyle: 'normal',
        fontSize: 20,
        fontWeight: 600
      }}
      content={
        <StyledContainer>
          <StyledSection>
            <StyledTitle>Lotto Number Format:</StyledTitle>
            <StyledText>Each lotto number is a sequence of 5 digits.</StyledText>
          </StyledSection>
          <StyledSection>
            <StyledTitle>Lotto Rounds and Reward Amounts:</StyledTitle>
            <StyledList>
              <StyledListItem>First Round: $750 USDT</StyledListItem>
              <StyledListItem>Second Round: $1,000 USDT</StyledListItem>
              <StyledListItem>Third Round: $2,000 USDT</StyledListItem>
            </StyledList>
          </StyledSection>
          <StyledSection>
            <StyledTitle>Prize Distribution:</StyledTitle>
            <StyledList>
              <StyledListItem>First and Second Rounds: Only one prize level (First Prize) is available.</StyledListItem>
              <StyledListItem>
                Third Round: Three prize levels are available—First Prize, Second Prize, and Third Prize.
              </StyledListItem>
            </StyledList>
          </StyledSection>
          <StyledSection>
            <StyledTitle>Prize Carryover Rules:</StyledTitle>
            <StyledList>
              <StyledListItem>
                If there is no winner in the First Round, the prize amount rolls over to the Second Round.
              </StyledListItem>
              <StyledListItem>
                If there is no winner in the Second Round, the prize rolls over to the Third Round.
              </StyledListItem>
              <StyledListItem>
                The Third Round guarantees that all prize money will be awarded:
                <ol>
                  <li className="ol-item">
                    If no one wins the First Prize, the prize amount is added to the Second Prize.
                  </li>
                  <li className="ol-item">
                    If no one wins the Second Prize, the combined prize amount is added to the Third Prize and will be
                    split equally among the winners.
                  </li>
                </ol>
              </StyledListItem>
            </StyledList>
          </StyledSection>
          <StyledSection>
            <StyledTitle>Winning Criteria:</StyledTitle>
            <StyledList>
              <StyledListItem>First Prize: All 5 digits must match the drawn number</StyledListItem>
              <StyledListItem>Second Prize: 4 out of the 5 digits must match the drawn number</StyledListItem>
              <StyledListItem>Third Prize: 3 out of the 5 digits must match the drawn number</StyledListItem>
            </StyledList>
          </StyledSection>
        </StyledContainer>
      }
    />
  );
};

export default Rules;

interface Props {
  visible: boolean;

  onClose?(): void;
}
