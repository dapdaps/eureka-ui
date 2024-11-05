import Modal from '@/components/Modal';
import {
  StyledContainer,
  StyledList,
  StyledListItem,
  StyledSection,
  StyledTitle
} from '@/views/Campaign/RubicHoldstation/sections/Tickets/Rules/styles';

const Rules = (props: Props) => {
  const { visible, onClose } = props;

  return (
    <Modal
      display={visible}
      title="Linea Liquid Legends Overview"
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
            <StyledList>
              <StyledListItem>Each lotto number is a sequence of 5 digits.</StyledListItem>
            </StyledList>
          </StyledSection>
          <StyledSection>
            <StyledTitle>Lotto Rounds and Reward Amounts:</StyledTitle>
            <StyledList>
              <StyledListItem>First Round: $2,000</StyledListItem>
              <StyledListItem>Second Round: $3,000</StyledListItem>
              <StyledListItem>Third Round: $5,000</StyledListItem>
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
                If there is no winner in the <strong>First Round</strong>, the prize amount rolls over to the{' '}
                <strong>Second Round</strong>.
              </StyledListItem>
              <StyledListItem>
                If there is no winner in the <strong>Second Round</strong>, the prize rolls over to the{' '}
                <strong>Third Round</strong>.
              </StyledListItem>
              <StyledListItem>
                The <strong>Third Round</strong> guarantees that all prize money will be awarded:
                <ol>
                  <li className="ol-item">
                    If no one wins the <strong>First Prize</strong>, the prize amount is added to the{' '}
                    <strong>Second Prize</strong>.
                  </li>
                  <li className="ol-item">
                    If no one wins the <strong>Second Prize</strong>, the combined prize amount is added to the{' '}
                    <strong>Third Prize</strong> and will be split equally among the winners.
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
