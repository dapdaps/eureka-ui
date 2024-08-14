import { memo } from 'react';
import { ListItem } from './components';
import {
  StyledContainer,
  Banner,
  Title,
  Desc,
  Wrap,
  H1,
} from './styles';
import useNetworks from './hooks/useNetworks';
import LoadingSkeleton from './components/loading';

const List = ({ path }: any) => {
  const { loading, l1NetworkList, l2networkList } = useNetworks();

  return (
    <StyledContainer>
      <Banner>
        <Title>
          Explore <span className="highlight">15+ L2</span> Networks
        </Title>
        <Desc>
          Discover the most popular Ethereum roll-ups and EVMs across the market. Also, <br />
          explore related blockchains including Layer-1s, sidechains, and testnets.
        </Desc>
      </Banner>
      <Wrap>
        <H1>L2 Networks</H1>
        {
          loading ? [...new Array(5).keys()].map((key) => (
            <LoadingSkeleton key={key} />
          )) : l2networkList.map((item: any, index: number) => (
            <ListItem dataSource={{...item, index}} key={item.id}/>
          ))
        }
        <H1>L1 Networks</H1>
        {
          loading ? [...new Array(2).keys()].map((key) => (
            <LoadingSkeleton key={key} />
          )) : l1NetworkList.map((item: any) => (
            <ListItem dataSource={item} />
          ))
        }
      </Wrap>
    </StyledContainer>
  );
};

export default memo(List);
