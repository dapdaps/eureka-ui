import {
  StyledCardContainer,
  StyledCardIcon,
  StyledCardName,
  StyledGameContainer,
  StyledGameFooter,
  StyledTextContainer,
  StyledCount,
  StyledText,
} from '@/views/OdysseyV2-1/components/Matrix/styles';
import ClaimButton from '@/views/OdysseyV2-1/components/ClaimButton';
import { useState } from 'react';

const array =[...new Array(36)].map((item, idx) => ({
  key: idx + 1,
  column: Math.floor((idx + 1) / 6) + ((idx + 1) % 6 === 0 ? 0 : 1),
  row: (idx + 1) % 6 || 6,
  complete: false
}));


const MatrixGame = () => {

  const [selectedList, setSelectedList] = useState<any[]>(array);
  const [selectedLines, setSelectedLines] = useState<number>(0);

  const handleLightPTS = (arr: any[]) => {
    const result = [];
    for (let i = 1; i <= 6; i++) {
      result.push(arr.filter((item) => item.column === i && item.complete));
      result.push(arr.filter((item) => item.row === i && item.complete));
    }
    const line = result.filter((item) => item.length === 6);
    if (line.length > 0) {
      setSelectedLines(line.length)
    }
  }

  const handleSelect = (index: number) => {
    const _selectedList = selectedList;
    _selectedList[index].complete = true;
    setSelectedList(_selectedList);
  }

  return <>
    <StyledGameContainer>
    {
      selectedList.map((i, idx) => (
          <StyledCardContainer onClick={() => handleSelect(idx)} className={ `${i.complete ? 'active' : ''} ${i.column === 6 && 'column-pts'} ${i.row === 6 && 'row-pts'}` } key={idx} count={200}>
          <StyledCardIcon className={''}></StyledCardIcon>
          <StyledCardName>{i.column}-{i.row}</StyledCardName>
        </StyledCardContainer>
      ))
    }

  </StyledGameContainer>
    <StyledGameFooter>
      <StyledTextContainer>
        <StyledCount>12</StyledCount>
        <StyledText>explored<br />dapps</StyledText>
      </StyledTextContainer>
      <StyledTextContainer className='center'>
        <StyledCount>{selectedLines}</StyledCount>
        <StyledText>Completed<br/>Lines</StyledText>
      </StyledTextContainer>
      <ClaimButton count={400}/>
    </StyledGameFooter>
  </>
}

export default MatrixGame;