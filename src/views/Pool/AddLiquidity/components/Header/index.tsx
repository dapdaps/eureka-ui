import { useRouter } from 'next/navigation';
import { memo } from 'react';

import VersionSelector from '@/views/Pool/components/VersionSelector';

import { StyledActions, StyledClearAll, StyledContainer, StyledIconButton, StyledTitle } from './styles';

const Header = ({
  setShowSettings,
  onCleanAll,
  from,
  onClose,
  version,
  setVersion,
  isAlign,
  title = 'Add Liquidity'
}: any) => {
  const router = useRouter();
  return (
    <StyledContainer>
      <div
        style={{
          display: 'flex',
          gap: '18px'
        }}
      >
        <StyledIconButton
          onClick={() => {
            onCleanAll && onCleanAll();
            from === 'modal' ? onClose() : router.back();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
            <path d="M7.5 1L2 6.49992L7.5 12" stroke="#979ABE" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </StyledIconButton>
        {!isAlign && <StyledTitle>{title}</StyledTitle>}
      </div>
      {isAlign && (
        <StyledTitle
          style={{
            paddingLeft: 0
          }}
        >
          {title}
        </StyledTitle>
      )}
      <StyledActions>
        {onCleanAll && <StyledClearAll onClick={onCleanAll}>Clean all</StyledClearAll>}
        {version && <VersionSelector version={version} setVersion={setVersion} />}
        {setShowSettings && (
          <StyledIconButton onClick={setShowSettings}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
              <path
                d="M17.3457 6.63086C17.3418 6.5957 17.3379 6.56641 17.332 6.54883V6.5332L17.3242 6.49023C17.1855 5.81445 16.7383 5.37891 16.1816 5.37891H16.0898C15.1406 5.37891 14.3711 4.60547 14.3711 3.66016C14.3711 3.44141 14.4727 3.13086 14.5156 3.02148C14.7852 2.39258 14.498 1.67578 13.832 1.31055L11.7363 0.125L11.6973 0.111328C11.541 0.0605468 11.3594 0 11.1562 0C10.7773 0 10.3516 0.175781 10.0879 0.439453C9.75781 0.765625 9.08789 1.25195 8.68945 1.25195C8.29297 1.25195 7.62109 0.767578 7.29102 0.439453C7.00977 0.162109 6.62109 0 6.22266 0C6.01367 0 5.83789 0.0585937 5.68164 0.111328L5.64648 0.125L3.44922 1.31445L3.43555 1.32227C2.90234 1.65625 2.68555 2.42187 2.95703 3.0293L2.96094 3.03711L2.96484 3.04492C3.00781 3.14062 3.14062 3.46484 3.14062 3.74805C3.14062 4.69727 2.36719 5.4668 1.42187 5.4668H1.33008C0.748047 5.4668 0.3125 5.89648 0.1875 6.58594L0.179688 6.625V6.63867C0.179688 6.6582 0.171875 6.68555 0.166016 6.7207C0.117188 7.01562 0 7.71094 0 8.2793C0 8.84766 0.115234 9.54297 0.166016 9.83789C0.169922 9.87305 0.173828 9.90234 0.179688 9.91992V9.93555L0.1875 9.97852C0.326172 10.6543 0.773438 11.0898 1.33008 11.0898H1.37695C2.32617 11.0898 3.0957 11.8633 3.0957 12.8086C3.0957 13.0273 2.99414 13.3379 2.95117 13.4473C2.69141 14.0391 2.9375 14.7988 3.51172 15.1816L3.52734 15.1895L5.59766 16.3418L5.63672 16.3555C5.79297 16.4062 5.9707 16.4668 6.17383 16.4668C6.60742 16.4668 6.99805 16.3008 7.24219 16.0273C7.26562 16.0098 7.28906 15.9863 7.31641 15.9629C7.56641 15.7441 8.23828 15.166 8.68164 15.166C9.01172 15.166 9.56445 15.5117 10.1211 16.0684C10.4023 16.3457 10.791 16.5078 11.1895 16.5078C11.459 16.5078 11.6582 16.4336 11.8848 16.3223L11.8926 16.3184L14.0156 15.1445L14.0234 15.1367C14.5566 14.8027 14.7734 14.0371 14.502 13.4297L14.498 13.4219L14.4941 13.4141C14.4902 13.4121 14.3242 13.0664 14.3555 12.7559L14.3594 12.7363V12.7168C14.3594 11.7676 15.1328 10.998 16.0781 10.998H16.1758C16.7578 10.998 17.1934 10.5684 17.3184 9.87891L17.3262 9.83984V9.82617C17.3301 9.81055 17.334 9.78711 17.3398 9.75586C17.3906 9.46875 17.5078 8.79883 17.5078 8.18555C17.5117 7.61914 17.3965 6.92578 17.3457 6.63086ZM8.75195 10.9746C7.25 10.9746 6.0332 9.75781 6.0332 8.25586C6.0332 6.75391 7.25 5.53711 8.75195 5.53711C10.2539 5.53711 11.4707 6.75391 11.4707 8.25586C11.4707 9.75781 10.2539 10.9746 8.75195 10.9746Z"
                fill="#979ABE"
              />
            </svg>
          </StyledIconButton>
        )}
      </StyledActions>
    </StyledContainer>
  );
};

export default memo(Header);
