import Big from 'big.js';

import Like from '@/components/Like/index';
import { useChainsStore } from '@/stores/chains';
import { percentDirection } from '@/views/networks/list/components/value-percent';
import useCategoryDappList from '@/views/Quest/hooks/useCategoryDappList';

import {
  StyledContainer,
  StyledDetailCategory,
  StyledDetailContainer,
  StyledDetailContent,
  StyledDetailDesc,
  StyledDetailLogo,
  StyledDetailName,
  StyledNetworks,
  StyledNetworksContainer,
  StyledSummary,
  StyledSummaryAdd,
  StyledSummaryAddIcon,
  StyledSummaryContainer,
  StyledSummaryLabel,
  StyledSummaryValue} from './styles';

const DappSummary = (props: Props) => {

  const {
    name,
    networks,
    logo,
    categories,
    summaries,
    dappId,
  } = props;

  const { categories: allCaregories } = useCategoryDappList();

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
        <StyledDetailLogo $logo={logo} />
        <StyledDetailContent>
          <StyledDetailDesc>
            <StyledDetailName>{name}</StyledDetailName>
            {categoryNames && categoryNames.map((categoryName: string, index: number) => (
                <StyledDetailCategory key={index} className={categoryName}>
                  {categoryName}
                </StyledDetailCategory>
              ))}
           <Like id={dappId} category='dapp' />
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
                return <StyledNetworks $logo={logo} key={item.netword_id} />;
              })
            }
          </StyledNetworksContainer>
        </StyledDetailContent>
      </StyledDetailContainer>
      <StyledSummaryContainer>
        {
          summaries.map((item, index) => {
            const increaseValue = item.increaseValue;
            const direction = percentDirection(increaseValue);
            return (
              <StyledSummary key={`summaries${index}`}>
                <StyledSummaryLabel>{item.label}</StyledSummaryLabel>
                <StyledSummaryValue>
                  {item.value || '-'}
                  {
                    direction.rotate !== false && (
                      <StyledSummaryAdd style={{ color: direction.color }}>
                        <StyledSummaryAddIcon>
                          {renderArrowIcon(direction)}
                        </StyledSummaryAddIcon>
                        {Big(increaseValue || 0).toFixed(2)}%
                      </StyledSummaryAdd>
                    )
                  }
                </StyledSummaryValue>
              </StyledSummary>
            );
          })
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
  dappId?: any;
}

const renderArrowIcon = (direction: any) => {
  if (direction.rotate === false) return null;
  return (
    <div style={{ transform: `rotate(${direction.rotate}deg)` }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path
          d="M4.56699 0.75C4.75944 0.416667 5.24056 0.416667 5.43301 0.75L8.89711 6.75C9.08956 7.08333 8.849 7.5 8.4641 7.5H1.5359C1.151 7.5 0.910436 7.08333 1.10289 6.75L4.56699 0.75Z"
          fill="currentColor" stroke="url(#paint0_linear_16163_4093)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_16163_4093"
            x1="10.9668"
            y1="1.71698"
            x2="-1"
            y2="1.71698"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const renderFavoritedIcon = (isFavorited: boolean) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="24" viewBox="0 0 36 24" fill="none">
    <mask id="path-2-inside-1_17104_362" fill="white">
      <path
        d="M18.5037 18.5724C18.3062 18.5724 18.1234 18.492 17.9844 18.3603L12.3384 12.7143C11.9127 12.2907 11.5752 11.7869 11.3454 11.2321C11.1157 10.6772 10.9983 10.0823 11 9.48172C11 8.26036 11.4754 7.11214 12.3384 6.24914C13.2014 5.38615 14.3496 4.91077 15.571 4.91077C16.6534 4.91077 17.6773 5.28376 18.5037 5.97123C20.2955 4.47927 22.9796 4.56703 24.6617 6.25646C25.5186 7.114 26 8.27671 26 9.48903C26 10.7014 25.5186 11.8641 24.6617 12.7216L19.023 18.3603C18.884 18.4993 18.6938 18.5724 18.5037 18.5724Z"
      />
    </mask>
    {
      isFavorited ? (
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.9844 18.3603C18.1234 18.492 18.3062 18.5724 18.5037 18.5724C18.6938 18.5724 18.884 18.4993 19.023 18.3603L24.6617 12.7216C25.5186 11.8641 26 10.7014 26 9.48903C26 8.27671 25.5186 7.114 24.6617 6.25646C22.9796 4.56703 20.2955 4.47927 18.5037 5.97123C17.6773 5.28376 16.6534 4.91077 15.571 4.91077C14.3496 4.91077 13.2014 5.38615 12.3384 6.24914C11.4754 7.11214 11 8.26036 11 9.48172C10.9983 10.0823 11.1157 10.6772 11.3454 11.2321C11.5752 11.7869 11.9127 12.2907 12.3384 12.7143L17.9844 18.3603ZM15.257 10.8127C16.0981 11.705 17.2756 12.2242 18.5042 12.2242C19.1147 12.2241 19.7185 12.0972 20.2774 11.8518C20.8364 11.6063 21.3383 11.2475 21.7514 10.7981C21.8824 10.6555 21.9513 10.4668 21.9431 10.2734C21.9348 10.08 21.8501 9.89779 21.7076 9.76687C21.565 9.63594 21.3762 9.56701 21.1829 9.57524C20.9895 9.58347 20.8073 9.66818 20.6763 9.81075C20.1205 10.4178 19.3233 10.7688 18.4969 10.7688C17.6632 10.7688 16.8953 10.4324 16.3248 9.81806C16.1929 9.67647 16.0102 9.59307 15.8168 9.58621C15.721 9.58281 15.6255 9.59831 15.5358 9.63182C15.446 9.66533 15.3637 9.71619 15.2936 9.78149C15.2235 9.8468 15.1669 9.92528 15.1271 10.0124C15.0874 10.0996 15.0651 10.1938 15.0617 10.2895C15.0549 10.4829 15.1251 10.6711 15.257 10.8127Z"
            fill="currentColor"
          />
        )
        : (
          <path
            d="M17.9844 18.3603L17.2773 19.0674L17.2869 19.077L17.2967 19.0863L17.9844 18.3603ZM12.3384 12.7143L13.0455 12.0072L13.0437 12.0054L12.3384 12.7143ZM11.3454 11.2321L12.2694 10.8495L12.2694 10.8495L11.3454 11.2321ZM11 9.48172L12 9.48458V9.48172H11ZM12.3384 6.24914L11.6313 5.54203L11.6313 5.54203L12.3384 6.24914ZM18.5037 5.97123L17.8642 6.74001L18.504 7.27225L19.1436 6.73971L18.5037 5.97123ZM24.6617 6.25646L23.953 6.96203L23.9543 6.96332L24.6617 6.25646ZM24.6617 12.7216L25.3688 13.4287L25.369 13.4285L24.6617 12.7216ZM18.5037 17.5724C18.584 17.5724 18.642 17.6058 18.6722 17.6344L17.2967 19.0863C17.6048 19.3782 18.0284 19.5724 18.5037 19.5724V17.5724ZM18.6915 17.6532L13.0455 12.0072L11.6313 13.4214L17.2773 19.0674L18.6915 17.6532ZM13.0437 12.0054C12.7117 11.6751 12.4485 11.2822 12.2694 10.8495L10.4215 11.6146C10.7018 12.2916 11.1136 12.9064 11.6331 13.4232L13.0437 12.0054ZM12.2694 10.8495C12.0902 10.4168 11.9987 9.95289 12 9.48458L10 9.47886C9.99793 10.2116 10.1412 10.9376 10.4215 11.6146L12.2694 10.8495ZM12 9.48172C12 8.52534 12.3702 7.63154 13.0455 6.95625L11.6313 5.54203C10.5806 6.59273 10 7.99538 10 9.48172H12ZM13.0455 6.95625C13.7208 6.28095 14.6146 5.91077 15.571 5.91077V3.91077C14.0846 3.91077 12.682 4.49134 11.6313 5.54203L13.0455 6.95625ZM15.571 5.91077C16.4188 5.91077 17.2167 6.20136 17.8642 6.74001L19.1432 5.20245C18.1379 4.36615 16.8879 3.91077 15.571 3.91077V5.91077ZM19.1436 6.73971C20.5436 5.57396 22.642 5.64529 23.953 6.96203L25.3703 5.55088C23.3171 3.48878 20.0474 3.38458 17.8638 5.20275L19.1436 6.73971ZM23.9543 6.96332C24.6239 7.63334 25 8.54181 25 9.48903H27C27 8.01161 26.4134 6.59465 25.369 5.54959L23.9543 6.96332ZM25 9.48903C25 10.4363 24.6239 11.3447 23.9543 12.0148L25.369 13.4285C26.4134 12.3834 27 10.9665 27 9.48903H25ZM23.9546 12.0145L18.3158 17.6532L19.7301 19.0674L25.3688 13.4287L23.9546 12.0145ZM18.3158 17.6532C18.3749 17.5942 18.4439 17.5724 18.5037 17.5724V19.5724C18.9438 19.5724 19.3931 19.4044 19.7301 19.0674L18.3158 17.6532Z"
            fill="currentColor"
            mask="url(#path-2-inside-1_17104_362)"
          />
        )
    }
  </svg>
);
