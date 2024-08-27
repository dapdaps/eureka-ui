import { useRouter } from 'next/router';
import { memo, useRef, useState } from 'react';

import Loading from '@/components/Icons/Loading';

import Common from '../common';
import OrderPanel from '../components/OrderPanel';
import useChechStatus from '../hooks/useChechStatus';
import useNetworksAndTokens from '../hooks/useNetworksAndTokens';
import {
  LoadingWrapper,
  StyledBack,
  StyledEmpty,
  StyledInput,
  StyledInputBox,
  StyledInputIcon,
  StyledInputWrapper,
  StyledSearch,
} from './styles';

const ShuShSearchView = () => {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState('');
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { loading, statusResult, queryStatus } = useChechStatus(true);
  const { loading: tokensLoading, tokens } = useNetworksAndTokens();

  const handleSearch = (val?: string) => {
    if (!val) return;
    queryStatus(val);
  };
  return (
    <Common anonymous={true} from="search">
      <StyledBack
        onClick={() => {
          router.back();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="none">
          <path d="M4 7L1 4L4 1" stroke="#979ABE" strokeLinecap="round" />
        </svg>
        <span>Back</span>
      </StyledBack>
      <StyledSearch>
        <div>Search Order</div>
        <StyledInputBox style={{ borderColor: focus ? '#FCC42C' : '#373a53' }}>
          <StyledInputIcon
            onClick={() => {
              handleSearch(searchVal);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M15.8348 14.2405L12.7247 11.1304C13.5586 9.97572 14.0497 8.55716 14.0497 7.02497C14.0497 3.14502 10.9048 0 7.02487 0C3.14497 0 0 3.14502 0 7.02314C0 10.9031 3.14497 14.0481 7.02487 14.0481C8.55704 14.0481 9.97557 13.5569 11.1302 12.723L14.2422 15.8351C14.4621 16.055 14.8195 16.055 15.0394 15.8351L15.8367 15.0378C16.0548 14.8179 16.0548 14.4605 15.8348 14.2405ZM2.00684 7.02314C2.00684 4.252 4.25378 2.00504 7.02487 2.00504C9.79597 2.00504 12.0429 4.252 12.0429 7.02314C12.0429 9.79427 9.79597 12.0412 7.02487 12.0412C4.25378 12.0412 2.00684 9.79611 2.00684 7.02314Z"
                fill="#979ABE"
              />
            </svg>
          </StyledInputIcon>
          <StyledInputWrapper>
            <StyledInput
              ref={inputRef}
              placeholder="Search by Shush ID"
              value={searchVal}
              onChange={(ev) => {
                setSearchVal(ev.target.value);
              }}
              onKeyDown={(ev: any) => {
                if (ev.keyCode === 13 && ev.target.value) {
                  handleSearch(ev.target.value);
                }
              }}
              autoFocus
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
              }}
            />
          </StyledInputWrapper>
          {searchVal && (
            <StyledInputIcon
              onClick={() => {
                setSearchVal('');
                if (inputRef.current) inputRef.current.focus();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
                  fill="#979ABE"
                />
              </svg>
            </StyledInputIcon>
          )}
        </StyledInputBox>
      </StyledSearch>
      {(loading || tokensLoading) && !statusResult ? (
        <LoadingWrapper>
          <Loading size={28} />
        </LoadingWrapper>
      ) : statusResult ? (
        <OrderPanel
          order={statusResult}
          tokens={tokens}
          defaultExpand={true}
          onSuccess={() => {
            queryStatus(searchVal);
          }}
        />
      ) : (
        statusResult === null && <StyledEmpty>No results.</StyledEmpty>
      )}
    </Common>
  );
};

export default memo(ShuShSearchView);
