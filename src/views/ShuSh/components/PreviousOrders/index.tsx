import { memo, useEffect, useMemo, useState } from 'react';
import OrderPanel from '../OrderPanel';
import useChechStatus from '../../hooks/useChechStatus';
import { useShushOrdersStore } from '@/stores/shush';
import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledSubtitle,
  StyledInputBox,
  StyledInputWrapper,
  StyledInput,
  StyledList,
  StyledEmpty,
} from './styles';

const PreviousOrders = ({ tokens }: any) => {
  const [searchId, setSearchId] = useState('');
  const shushOrdersStore: any = useShushOrdersStore();
  const { queryStatus } = useChechStatus(false);

  const refreshOrders = () => {
    const _semis = shushOrdersStore.semis;
    const _orders = Object.values(shushOrdersStore.orders).filter((order: any) => {
      const isNotExpired = Date.now() - new Date(order.created).getTime() < 60 * 60 * 1000;
      if (!isNotExpired) delete _semis[order.houdiniId];
      return isNotExpired;
    });
    shushOrdersStore.set({
      orders: _orders.reduce((acc: any, order: any) => ({ ...acc, [order.houdiniId]: order }), {}),
      semis: _semis,
    });

    setTimeout(
      () => {
        refreshOrders();
        _orders.forEach((order: any) => {
          queryStatus(order.houdiniId);
        });
      },
      1 * 60 * 1000,
    );
  };

  const filterOrders = useMemo(() => {
    if (!searchId) return Object.values(shushOrdersStore.orders);
    return Object.values(shushOrdersStore.orders).filter((order: any) => order.houdiniId.includes(searchId));
  }, [shushOrdersStore.orders, searchId]);

  useEffect(() => {
    refreshOrders();
  }, []);

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
        <StyledInputBox>
          <StyledInputWrapper>
            <StyledInput
              placeholder="Search by Shush ID"
              value={searchId}
              onChange={(ev) => {
                setSearchId(ev.target.value);
              }}
            />
          </StyledInputWrapper>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M15.8348 14.2405L12.7247 11.1304C13.5586 9.97572 14.0497 8.55716 14.0497 7.02497C14.0497 3.14502 10.9048 0 7.02487 0C3.14497 0 0 3.14502 0 7.02314C0 10.9031 3.14497 14.0481 7.02487 14.0481C8.55704 14.0481 9.97557 13.5569 11.1302 12.723L14.2422 15.8351C14.4621 16.055 14.8195 16.055 15.0394 15.8351L15.8367 15.0378C16.0548 14.8179 16.0548 14.4605 15.8348 14.2405ZM2.00684 7.02314C2.00684 4.252 4.25378 2.00504 7.02487 2.00504C9.79597 2.00504 12.0429 4.252 12.0429 7.02314C12.0429 9.79427 9.79597 12.0412 7.02487 12.0412C4.25378 12.0412 2.00684 9.79611 2.00684 7.02314Z"
              fill="#979ABE"
            />
          </svg>
        </StyledInputBox>
      </StyledHeader>
      <StyledList>
        {filterOrders.length ? (
          filterOrders.map((order: any) => (
            <OrderPanel
              key={order.id}
              order={order}
              tokens={tokens}
              defaultExpand={false}
              onSuccess={() => {
                queryStatus(order.houdiniId);
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
