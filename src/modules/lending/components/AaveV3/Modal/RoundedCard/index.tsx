import { styled } from 'styled-components';

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--agg-primary-color, #fff);
  margin-bottom: 10px;
`;

const Content = styled.div`
  padding: 18px 14px;
  background: var(--agg-secondary-color, rgba(0, 0, 0, 0.26));
  border: 1px solid #383947;
  border-radius: 10px;
`;

const RoundedCard = (props: any) => {
  return (
    <div>
      <Title>{props.title}</Title>
      <Content>{props.children}</Content>
    </div>
  );
};

export default RoundedCard;
