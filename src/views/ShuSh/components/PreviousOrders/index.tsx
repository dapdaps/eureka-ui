import { useRouter } from 'next/router';
import { memo } from 'react';

import Loading from '@/components/Icons/Loading';

import usePreviousOrders from '../../hooks/usePreviousOrders';
import OrderPanel from '../OrderPanel';
import {
  LoadingWrapper,
  StyledContainer,
  StyledEmpty,
  StyledHeader,
  StyledList,
  StyledSearchBtn,
  StyledSubtitle,
  StyledTitle,
} from './styles';

const PreviousOrders = ({ tokens }: any) => {
  const { loading, orders, fetchOrders } = usePreviousOrders();
  const router = useRouter();

  return (
    <StyledContainer>
      <StyledHeader>
        <div>
          <StyledTitle>Previous Orders</StyledTitle>
          <StyledSubtitle>
            <span>Disappear</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M11.5691 7.00033C11.5691 8.21217 11.0877 9.37437 10.2308 10.2313C9.37388 11.0882 8.21168 11.5696 6.99984 11.5696C5.788 11.5696 4.62579 11.0882 3.76889 10.2313C2.91199 9.37437 2.43059 8.21217 2.43059 7.00033C2.43059 5.78849 2.91199 4.62628 3.76889 3.76938C4.62579 2.91248 5.788 2.43108 6.99984 2.43108C8.21168 2.43108 9.37388 2.91248 10.2308 3.76938C11.0877 4.62628 11.5691 5.78849 11.5691 7.00033ZM6.99984 12.8337C10.2216 12.8337 12.8332 10.2221 12.8332 7.00033C12.8332 3.77858 10.2216 1.16699 6.99984 1.16699C3.77809 1.16699 1.1665 3.77858 1.1665 7.00033C1.1665 10.2221 3.77809 12.8337 6.99984 12.8337ZM7.63159 4.56958C7.63159 4.40202 7.56503 4.24134 7.44655 4.12286C7.32808 4.00438 7.16739 3.93783 6.99984 3.93783C6.83229 3.93783 6.6716 4.00438 6.55312 4.12286C6.43465 4.24134 6.36809 4.40202 6.36809 4.56958V7.00033C6.36809 7.34916 6.651 7.63208 6.99984 7.63208H9.43059C9.59814 7.63208 9.75883 7.56552 9.8773 7.44704C9.99578 7.32856 10.0623 7.16788 10.0623 7.00033C10.0623 6.83277 9.99578 6.67209 9.8773 6.55361C9.75883 6.43513 9.59814 6.36858 9.43059 6.36858H7.63159V4.56958Z"
                fill="#979ABE"
              />
            </svg>
            <span>1 hour after creation</span>
          </StyledSubtitle>
        </div>
        <StyledSearchBtn
          onClick={() => {
            router.push('/shush/search');
          }}
        >
          Search Order
        </StyledSearchBtn>
      </StyledHeader>
      <StyledList>
        {loading && orders.length === 0 ? (
          <LoadingWrapper>
            <Loading size={26} />
          </LoadingWrapper>
        ) : orders.length ? (
          orders.map((order: any) => (
            <OrderPanel
              key={order.houdiniId + order.status}
              order={order}
              tokens={tokens}
              defaultExpand={false}
              onSuccess={() => {
                fetchOrders();
              }}
            />
          ))
        ) : (
          <StyledEmpty>Your previous orders will appear here</StyledEmpty>
        )}
      </StyledList>
    </StyledContainer>
  );
};

export default memo(PreviousOrders);
