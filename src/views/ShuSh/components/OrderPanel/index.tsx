import Big from 'big.js';
import { format } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import { memo, useEffect, useState } from 'react';

import CopyButton from '@/components/CopyButton';
import { ellipsAccount } from '@/utils/account';

import Expired from './Expired';
import OpenInWallet from './OpenInWallet';
import Process from './Process';
import {
  StyledContainer,
  StyledExpand,
  StyledExpandContainer,
  StyledExpandContent,
  StyledItem,
  StyledMainItem,
  StyledMainItems,
  StyledTokenIcon,
  StyledTop,
  StyledTopLeft,
} from './styles';
import Timer from './Timer';

const OrderPanel = ({ order, tokens, defaultExpand, onSuccess }: any) => {
  const [expand, setExpand] = useState(defaultExpand);
  const inToken = tokens[order.inSymbol] || {};
  const outToken = tokens[order.outSymbol] || {};
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    setExpired(order.status === 5);
  }, [order]);
  return (
    <StyledContainer>
      <StyledTop
        initial={false}
        style={{ borderRadius: expand ? '16px 16px 0px 0px' : '16px' }}
        onClick={() => {
          setExpand(!expand);
        }}
      >
        <StyledTopLeft>
          <StyledTokenIcon src={inToken.icon} />
          <div>
            {order.inAmount} {inToken.displayName}
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10" fill="none">
            <path
              d="M1 4.4C0.66863 4.4 0.4 4.66863 0.4 5C0.4 5.33137 0.668628 5.6 0.999999 5.6L1 4.4ZM11.9243 5.42428C12.1586 5.18996 12.1586 4.81006 11.9243 4.57575L8.10589 0.757368C7.87158 0.523054 7.49168 0.523053 7.25736 0.757367C7.02305 0.991682 7.02305 1.37158 7.25736 1.6059L10.6515 5.00001L7.25735 8.39412C7.02304 8.62844 7.02304 9.00833 7.25735 9.24265C7.49167 9.47696 7.87157 9.47696 8.10588 9.24265L11.9243 5.42428ZM0.999999 5.6L11.5 5.60001L11.5 4.40001L1 4.4L0.999999 5.6Z"
              fill="#979ABE"
            />
          </svg>
          <StyledTokenIcon src={outToken.icon} />
          <div>
            <span className="color">{new Big(order.outAmount).toFixed(2)}</span> {outToken.displayName}
          </div>
        </StyledTopLeft>
        {!expired && (
          <StyledExpand $expand={expand} $done={order.status === 4}>
            {order.status === 4 ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9.75" viewBox="0 0 16 13" fill="none">
                <path
                  d="M1.52002 6.27996L5.84002 10.6L14.48 1.95996"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="2" viewBox="0 0 9 2" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1ZM5.33333 1C5.33333 1.55228 4.88562 2 4.33333 2C3.78105 2 3.33333 1.55228 3.33333 1C3.33333 0.447715 3.78105 0 4.33333 0C4.88562 0 5.33333 0.447715 5.33333 1ZM7.66667 2C8.21895 2 8.66667 1.55228 8.66667 1C8.66667 0.447715 8.21895 0 7.66667 0C7.11438 0 6.66667 0.447715 6.66667 1C6.66667 1.55228 7.11438 2 7.66667 2Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </StyledExpand>
        )}
        {expired && (
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.8897 6C11.6595 4.66667 13.584 4.66667 14.3538 6L18.9725 13.9999C19.7423 15.3332 18.7801 16.9999 17.2405 16.9999H8.00298C6.46338 16.9999 5.50113 15.3332 6.27093 13.9999L10.8897 6ZM11.9018 9.46316C11.9018 9.06663 12.2233 8.74518 12.6198 8.74518C13.0163 8.74518 13.3378 9.06663 13.3378 9.46316V12.3351C13.3378 12.7316 13.0163 13.0531 12.6198 13.0531C12.2233 13.0531 11.9018 12.7316 11.9018 12.3351V9.46316ZM12.6194 13.7687C12.2231 13.7687 11.9018 14.0899 11.9018 14.4862C11.9018 14.8825 12.2231 15.2037 12.6194 15.2037C13.0156 15.2037 13.3369 14.8825 13.3369 14.4862C13.3369 14.0899 13.0156 13.7687 12.6194 13.7687Z"
              fill="#FF547D"
            />
            <circle cx="12.5" cy="12.5" r="12" fill="#FF547D" fillOpacity="0.1" stroke="#FF547D" />
          </svg>
        )}
      </StyledTop>
      <AnimatePresence initial={false}>
        {expand && (
          <StyledExpandContainer
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <StyledExpandContent>
              <StyledItem>
                <div>Shush ID:</div>
                <div className="color">{order.houdiniId}</div>
                <CopyButton
                  size={12}
                  text={order.houdiniId}
                  tooltipMessage="Copied"
                  tooltipTop={-31}
                  tooltipRight={-12}
                  tooltipFontSize={12}
                  buttonColor="rgba(255,255,255,0.6)"
                />
              </StyledItem>
              <StyledItem className="mt">
                <div>Recipient: </div>
                <div className="white">{ellipsAccount(order.receiverAddress)}</div>
              </StyledItem>
              {!expired && (
                <>
                  <StyledMainItems className="mt">
                    <StyledMainItem>
                      <StyledItem>
                        <div>Creation time: </div>
                        <div className="white">{format(new Date(order.created), 'dd/MM/yyyy HH:mm')}</div>
                      </StyledItem>
                      {order.status === 0 ? (
                        <StyledItem className="mt">
                          <div>Send your funds within </div>
                          <Timer
                            endTime={new Date(order.expires).getTime()}
                            onEnd={() => {
                              setExpired(true);
                            }}
                          />
                        </StyledItem>
                      ) : (
                        <StyledItem className="mt">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="9.75"
                            viewBox="0 0 16 13"
                            fill="none"
                          >
                            <path
                              d="M1.52002 6.27996L5.84002 10.6L14.48 1.95996"
                              stroke="#FCC42C"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="color">Funds Received</div>
                        </StyledItem>
                      )}
                    </StyledMainItem>
                    <StyledMainItem>
                      <StyledItem>
                        <div>Send </div>
                        <div>
                          <span className="color">{order.inAmount} </span>
                          <span>{inToken.displayName}</span>
                        </div>
                      </StyledItem>
                      <StyledItem>
                        <div className="color">{ellipsAccount(order.senderAddress)}</div>
                        <CopyButton
                          size={12}
                          text={order.senderAddress}
                          tooltipMessage="Copied"
                          tooltipTop={-31}
                          tooltipRight={-12}
                          tooltipFontSize={12}
                          buttonColor="rgba(255,255,255,0.6)"
                        />
                      </StyledItem>
                      {order.status === 0 && <OpenInWallet order={order} tokens={tokens} onSuccess={onSuccess} />}
                    </StyledMainItem>
                    <StyledMainItem>
                      <div>Est. swap time</div>
                      <div className="color">{order.eta} minutes</div>
                    </StyledMainItem>
                  </StyledMainItems>
                  <Process status={order.status} />
                </>
              )}
              {expired && <Expired />}
            </StyledExpandContent>
          </StyledExpandContainer>
        )}
      </AnimatePresence>
    </StyledContainer>
  );
};

export default memo(OrderPanel);
