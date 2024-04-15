import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 10px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(151, 154, 190, 1);
  font-size: 14px;
  font-weight: 400;
  padding: 0 36px;
  height: 60px;

  .footer-right {
    text-align: right;
  }
`;
const StyledSocials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const StyledSocialButton = styled(motion.div)`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const StyledFooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-grow: 1;
`;
const StyledFooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SocialButton = ({ icon, alt, url }: { icon: any; alt: string; url?: string }) => {
  return url ? (
    <StyledSocialButton
      whileHover={{ opacity: 0.6 }}
      whileTap={{ opacity: 0.4 }}
      onClick={() => {
        window.open(url, '_blank');
      }}
      data-bp="3001-002"
    >
      {icon}
    </StyledSocialButton>
  ) : (
    icon
  );
};
const Footer = () => {
  const router = useRouter();
  return (
    <StyledContainer>
      <StyledFooterLeft>
        <div>Created by DapDap team with ❤️ </div>
        <div>Powered by NEAR</div>
      </StyledFooterLeft>
      <StyledFooterRight>
        <StyledSocials>
          <SocialButton
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M7.1428 5.08177L11.6108 0H10.5524L6.6712 4.41152L3.5736 0H0L4.6852 6.67164L0 12H1.0584L5.1544 7.34028L8.4264 12H12M1.4404 0.780949H3.0664L10.5516 11.2574H8.9252"
                  fill="url(#paint0_linear_4989_162)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4989_162"
                    x1="6"
                    y1="0"
                    x2="6"
                    y2="13.2381"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#979ABE" />
                    <stop offset="1" stopColor="#979ABE" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            }
            alt="Twitter"
            url="https://twitter.com/DapDapMeUp"
          />
          <SocialButton
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path
                  d="M8 0.491013C4.81493 0.491013 2.58063 1.69243 2.58063 1.69243C3.80475 0.731297 5.94397 0.177601 5.94397 0.177601L5.74193 0C3.73344 0.0313412 1.9151 1.25365 1.9151 1.25365C-0.129049 5.00415 0.00168121 8.24275 0.00168121 8.24275C1.66552 10.1337 4.13751 9.99786 4.13751 9.99786L4.98132 9.05762C3.49575 8.77555 2.55686 7.61592 2.55686 7.61592C2.55686 7.61592 4.79116 8.95315 8 8.95315C11.2088 8.95315 13.4431 7.61592 13.4431 7.61592C13.4431 7.61592 12.5043 8.77555 11.0187 9.05762L11.8625 9.99786C11.8625 9.99786 14.3345 10.1337 15.9983 8.24275C15.9983 8.24275 16.129 5.00415 14.0849 1.25365C14.0849 1.25365 12.2666 0.0313412 10.2581 0L10.056 0.177601C10.056 0.177601 12.1953 0.731297 13.4194 1.69243C13.4194 1.69243 11.1851 0.491013 8 0.491013ZM5.53989 4.45046C6.31239 4.45046 6.94227 5.04594 6.93039 5.77724C6.93039 6.49809 6.31239 7.10402 5.53989 7.10402C4.77928 7.10402 4.16128 6.49809 4.16128 5.77724C4.16128 5.04594 4.76739 4.45046 5.53989 4.45046ZM10.4958 4.45046C11.2683 4.45046 11.8863 5.04594 11.8863 5.77724C11.8863 6.49809 11.2683 7.10402 10.4958 7.10402C9.73515 7.10402 9.11715 6.49809 9.11715 5.77724C9.11715 5.04594 9.72326 4.45046 10.4958 4.45046Z"
                  fill="url(#paint0_linear_4989_163)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4989_163"
                    x1="8"
                    y1="0"
                    x2="8"
                    y2="11.0317"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#979ABE" />
                    <stop offset="1" stopColor="#979ABE" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            }
            alt="Discord"
            url="https://discord.gg/x5USArxKVH"
          />
          <SocialButton
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                <path
                  d="M5.643 11.274L5.87603 7.91777L12.2677 2.42717C12.5506 2.1812 12.2094 2.06219 11.8349 2.27642L3.94523 7.02912L0.533028 5.99764C-0.199346 5.79929 -0.207669 5.31529 0.699476 4.96617L13.9904 0.0785899C14.5979 -0.183245 15.1805 0.221409 14.9475 1.11006L12.6838 11.274C12.5257 11.996 12.0679 12.1706 11.4354 11.8374L7.98993 9.40943L6.33376 10.9408C6.14235 11.1233 5.98422 11.274 5.643 11.274Z"
                  fill="url(#paint0_linear_4989_164)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4989_164"
                    x1="7.5"
                    y1="0"
                    x2="7.5"
                    y2="13.2381"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#979ABE" />
                    <stop offset="1" stopColor="#979ABE" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            }
            alt="Tg"
            url="https://t.me/DapDapDiscussion"
          />
          {/* <SocialButton
            src="https://assets.dapdap.net/images/bafkreifyzh5mqbh6z6utj7z4dp2eelhaa654mnt6mut4oxml3mw56fqoxm.svg"
            alt="Medium"
            url=""
          /> */}
          <SocialButton
            icon={
              <svg fill="currentColor" width="16px" height="15px" viewBox="0 0 24 24" role="img">
                <path d="M10.802 17.77a.703.703 0 1 1-.002 1.406.703.703 0 0 1 .002-1.406m11.024-4.347a.703.703 0 1 1 .001-1.406.703.703 0 0 1-.001 1.406m0-2.876a2.176 2.176 0 0 0-2.174 2.174c0 .233.039.465.115.691l-7.181 3.823a2.165 2.165 0 0 0-1.784-.937c-.829 0-1.584.475-1.95 1.216l-6.451-3.402c-.682-.358-1.192-1.48-1.138-2.502.028-.533.212-.947.493-1.107.178-.1.392-.092.62.027l.042.023c1.71.9 7.304 3.847 7.54 3.956.363.169.565.237 1.185-.057l11.564-6.014c.17-.064.368-.227.368-.474 0-.342-.354-.477-.355-.477-.658-.315-1.669-.788-2.655-1.25-2.108-.987-4.497-2.105-5.546-2.655-.906-.474-1.635-.074-1.765.006l-.252.125C7.78 6.048 1.46 9.178 1.1 9.397.457 9.789.058 10.57.006 11.539c-.08 1.537.703 3.14 1.824 3.727l6.822 3.518a2.175 2.175 0 0 0 2.15 1.862 2.177 2.177 0 0 0 2.173-2.14l7.514-4.073c.38.298.853.461 1.337.461A2.176 2.176 0 0 0 24 12.72a2.176 2.176 0 0 0-2.174-2.174" />
              </svg>
            }
            alt="Gitbook"
            url="https://docs.dapdap.net/"
          />
        </StyledSocials>
        <div className="footer-right">Copyright 2024 DapDap</div>
      </StyledFooterRight>
    </StyledContainer>
  );
};

export default Footer;
