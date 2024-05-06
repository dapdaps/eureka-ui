import { ReactElement } from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  line-height: 26.4px;
  color: #fff;
`

const SubTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 20px;
`

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
  color: rgba(151, 154, 190, 1);
`

interface Props {
    title: string;
    subTitle: string;
    renderAction?: () => ReactElement | null
}

export default function PublicTitle({
    title,
    subTitle,
    renderAction
}: Props) {
    return  <div>
    <Title>{ title }</Title>
    <SubTitleBox>
      <SubTitle>{ subTitle }</SubTitle>
      {
            renderAction && renderAction()
      }
    </SubTitleBox>
    </div>
}