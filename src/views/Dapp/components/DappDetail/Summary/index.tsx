import useCategoryDappList from '@/views/Quest/hooks/useCategoryDappList';
import {
  StyledContainer,
  StyledDetailContainer,
  StyledSummaryContainer,
  StyledDetailLogo,
  StyledDetailContent,
  StyledDetailName,
  StyledDetailCategory,
  StyledNetworksContainer,
  StyledNetworks,
  StyledDetailDesc,
  StyledSummary,
  StyledSummaryLabel,
  StyledSummaryValue,
  StyledSummaryAdd,
  StyledSummaryAddIcon
} from './styles';
import { useChainsStore } from '@/stores/chains';

const renderIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path
        d="M4.56699 0.75C4.75944 0.416667 5.24056 0.416667 5.43301 0.75L8.89711 6.75C9.08956 7.08333 8.849 7.5 8.4641 7.5H1.5359C1.151 7.5 0.910436 7.08333 1.10289 6.75L4.56699 0.75Z"
        fill="currentColor" stroke="url(#paint0_linear_16163_4093)" />
      <defs>
        <linearGradient id="paint0_linear_16163_4093" x1="10.9668" y1="1.71698" x2="-1" y2="1.71698"
                        gradientUnits="userSpaceOnUse">
          <stop stop-color="currentColor" />
          <stop offset="1" stop-color="currentColor" stop-opacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const DappSummary = (props: Props) => {

  const {
    name,
    networks,
    logo,
    categories,
    summaries,
  } = props;

  console.log(props);

  const { loading, categories: allCaregories } = useCategoryDappList();

  function getCategoryNames(dappCategories: any[], categoryArray: any[]) {
    if (!Array.isArray(dappCategories)) {
      return [];
    }
    return dappCategories.map((categoryItem: any) => {
      const category = categoryArray.find((c: any) => c.id === categoryItem.category_id);
      if (category) {
        return category.name;
      } else {
        return 'Category not found';
      }
    });
  }

  const categoryNames = getCategoryNames(categories, Object.values(allCaregories));

  const chains = useChainsStore((store: any) => store.chains);

  return (
    <StyledContainer>
      <StyledDetailContainer>
        <StyledDetailLogo $logo={logo}/>
        <StyledDetailContent>
          <StyledDetailDesc>
            <StyledDetailName>{name}</StyledDetailName>
            {categoryNames &&
              categoryNames.map((categoryName: string, index: number) => (
                <StyledDetailCategory key={index} className={categoryName}>
                  {categoryName}
                </StyledDetailCategory>
              ))}
          </StyledDetailDesc>
          <StyledNetworksContainer>
            {
              networks.map(item => {
                const networkItem = chains.find((network: any) => network.id === item.network_id);
                let logo = networkItem ? networkItem.logo : '';
                if (item.chain_id === 1) {
                  logo =
                    'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg';
                }
                return <StyledNetworks $logo={logo} key={item.netword_id}/>
              })
            }
          </StyledNetworksContainer>
        </StyledDetailContent>
      </StyledDetailContainer>
      <StyledSummaryContainer>
        {
          summaries.map((item, index) => (
            <StyledSummary key={`summaries${index}`}>
              <StyledSummaryLabel>{item.label}</StyledSummaryLabel>
              <StyledSummaryValue>
                {item.value || '-'}
                <StyledSummaryAdd>
                  {
                    item.increaseValue && <>
                      <StyledSummaryAddIcon>
                        {renderIcon()}
                      </StyledSummaryAddIcon>
                      {item.increaseValue}
                    </>
                  }
                </StyledSummaryAdd>
              </StyledSummaryValue>
            </StyledSummary>
          ))
        }
      </StyledSummaryContainer>
    </StyledContainer>
  );
};

export default DappSummary;

interface Props {
  name: string;
  networks: Record<string, any>[];
  logo: string;
  categories: Record<string, any>[];
  summaries: Record<string, any>[];
}