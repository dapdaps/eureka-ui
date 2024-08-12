import { FeatureType } from '../../types'
import RectangleNumber from '../RectangleNumber';
import {
  StyledContainer,
  StyledCard,
  StyledFeature,
  StyledEmpty
} from './styles';
import { useMemo } from 'react';
import popupsData from '@/config/all-in-one/chains';
import {MenuConfig} from '@/views/AllInOne/hooks/useChain';
import chainCofig from '@/config/chains';
import AllInOneCardView from '@/views/AllInOne/components/Card';
import { StyledFlex, StyledFont } from '@/styled/styles';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import Empty from '@/components/Empty';

type PropsType = {
  features: FeatureType[],
  loaded: boolean
}

const formatIds = (_relateId: number) => {

  const menuId = +_relateId.toString().slice(-4);
  const chainId = +_relateId.toString().slice(0, _relateId.toString().length - 4);

  return {
    menuId,
    chainId
  }
}

export default function Features({
  features,
  loaded
}: PropsType) {

  const router = useRouter();

  const chainData = Object.values(popupsData);

  const featuresList = useMemo(() => {

    return features.map(item => {
      const _item: any = {...item};
      const { menuId= 0, chainId = 0 } = formatIds(item.relate_id);
      _item.chainId = chainId;
      const currentChain = chainData.find(chain => chain.chainId === chainId);
      const chainName: string = chainCofig[chainId]?.chainName;
      if (currentChain) {
        for (const key in MenuConfig) {
          if (MenuConfig[key].id === menuId) {
            _item.config = {};
            _item.config = currentChain;
            _item.menuConfig = (currentChain?.menuConfig?.[key] || currentChain?.menuConfig?.[currentChain?.defaultTab ?? '']) ?? {};
            _item.title = chainName + ' ' + key;
            _item.component = MenuConfig[key].component;
          }
        }
      }


      return _item;
    })
  }, [features]);

  const handleMenuSelect = (path: string, tab: string) => {
    if (!path || !tab) return;
    router.push(`/all-in-one/${path}/${tab}`);
  }


  return (
    <StyledContainer style={{ marginTop: 30 }}>
      <StyledFlex gap='6px' style={{ paddingLeft: 16, marginBottom: 20 }}>
        <StyledFont color='#FFF' fontSize='20px' fontWeight='600'>Features</StyledFont>
        <RectangleNumber quantity={features?.length} />
      </StyledFlex>
      <StyledFeature>
      {
        loaded ? (<>
          {
            featuresList?.length > 0 ? (featuresList.map((item, index) => (
              <StyledCard key={item.relate_id}>
                <AllInOneCardView
                  style={{ height: '308px' }}
                  title={item.title}
                  subTitle={item.menuConfig?.description}
                  bgColor={item.config?.selectBgColor}
                  path={item.config?.path}
                  chainId={item.chainId}
                  onSelect={() => {
                    handleMenuSelect(item.config?.path, item.menuConfig?.tab.toLowerCase());
                  }}
                >
                  {
                    item.component && (<item.component chain={item} disabled />)
                  }

                </AllInOneCardView>
              </StyledCard>
            ))) : <StyledEmpty><Empty size={42} tips='No features yet.' /></StyledEmpty>
          }
        </>) : (
          new Array(2).fill('').map((_, idx) => (
            <StyledCard key={idx}>
              <Skeleton height={308} />
            </StyledCard>
          ))
        )
      }
      </StyledFeature>
    </StyledContainer>
  )
}