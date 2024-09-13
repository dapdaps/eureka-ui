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
      title="Lottery Rules Overview"
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
            <StyledTitle>Lottery Number Format:</StyledTitle>
            <StyledText>The lottery number consists of 5 digits.</StyledText>
          </StyledSection>
          <StyledSection>
            <StyledTitle>Lottery Rounds and Prizes:</StyledTitle>
            <StyledList>
              <StyledListItem>First Round: $750</StyledListItem>
              <StyledListItem>Second Round: $1000</StyledListItem>
              <StyledListItem>Third Round: $2000</StyledListItem>
            </StyledList>
          </StyledSection>
          <StyledSection>
            <StyledTitle>Prize Settings:</StyledTitle>
            <StyledList>
              <StyledListItem>The first and second rounds only have a first prize.</StyledListItem>
              <StyledListItem>The third round has first, second, and third prizes.</StyledListItem>
            </StyledList>
          </StyledSection>
          <StyledSection>
            <StyledTitle>Prize Carryover Rules:</StyledTitle>
            <StyledList>
              <StyledListItem>
                If no one wins in the first round, the prize carries over to the second round.
              </StyledListItem>
              <StyledListItem>
                If no one wins in the second round, the prize carries over to the third round.
              </StyledListItem>
              <StyledListItem>
                The third round cannot be void; if no one wins the first prize, the prize carries over to the second
                prize; if no one wins the second prize, the prize carries over to the third prize and is split equally
                among the winners.
              </StyledListItem>
            </StyledList>
          </StyledSection>
          <StyledSection>
            <StyledTitle>Winning Conditions:</StyledTitle>
            <StyledList>
              <StyledListItem>First Prize: All 5 digits are identical.</StyledListItem>
              <StyledListItem>Second Prize: 4 out of 5 digits are identical.</StyledListItem>
              <StyledListItem>Third Prize: 3 out of 5 digits are identical.</StyledListItem>
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
