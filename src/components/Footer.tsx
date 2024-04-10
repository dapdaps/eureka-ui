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
              <svg
                width="15"
                height="15"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M13.4107 16.7783C14.9704 17.6796 15.7503 18.1302 16.6069 18.131C17.4635 18.1317 18.2441 17.6824 19.8054 16.7839L29.7371 11.0678C30.1861 10.8093 30.4629 10.3306 30.4629 9.8125C30.4629 9.29436 30.1861 8.81569 29.7371 8.55723L19.8018 2.83907C18.2422 1.94146 17.4624 1.49265 16.6067 1.49298C15.7509 1.49332 14.9714 1.94273 13.4125 2.84156L4.87619 7.76347C4.80701 7.80336 4.77242 7.82331 4.74019 7.84222C1.82668 9.55246 0.0265912 12.6682 0.000290907 16.0465C0 16.0839 0 16.1238 0 16.2037C0 16.2834 0 16.3233 0.00029028 16.3606C0.0265326 19.7351 1.82261 22.848 4.73092 24.5595C4.76309 24.5785 4.79761 24.5984 4.86666 24.6384L10.2053 27.7246C13.3292 29.5305 14.8912 30.4334 16.6068 30.434C18.3224 30.4346 19.885 29.5327 23.0101 27.7289L28.6521 24.4724C30.2141 23.5708 30.9951 23.12 31.4239 22.3774C31.8528 21.6348 31.8528 20.733 31.8528 18.9294V16.225V15.435C31.8528 14.9349 31.5821 14.4741 31.1453 14.2305C30.722 13.9945 30.2058 13.998 29.7858 14.2397L18.2016 20.9069C17.423 21.3551 17.0337 21.5791 16.6064 21.5792C16.1791 21.5794 15.7897 21.3556 15.0108 20.9079L7.17309 16.4033C6.77918 16.1769 6.58223 16.0637 6.42404 16.0433C6.06444 15.997 5.71866 16.1984 5.58141 16.534C5.52103 16.6816 5.52225 16.9087 5.52469 17.3631C5.52648 17.6972 5.52738 17.8642 5.55865 18.0179C5.62846 18.3609 5.80888 18.6716 6.07224 18.9023C6.19019 19.0057 6.33483 19.0892 6.62409 19.2564L15.0064 24.1003C15.7873 24.5516 16.1777 24.7772 16.6065 24.7773C17.0354 24.7775 17.4259 24.552 18.2071 24.1012L28.4815 18.1713C28.7482 18.0174 28.8815 17.9404 28.9815 17.9982C29.0815 18.0559 29.0815 18.2098 29.0815 18.5177V20.1011C29.0815 20.552 29.0815 20.7774 28.9743 20.9631C28.867 21.1488 28.6718 21.2614 28.2813 21.4868L19.809 26.3766C18.2461 27.2787 17.4647 27.7297 16.6067 27.7293C15.7487 27.7289 14.9677 27.2772 13.4056 26.3737L5.48222 21.791C5.45373 21.7745 5.43949 21.7663 5.4262 21.7585C3.76652 20.786 2.74242 19.0106 2.73155 17.087C2.73146 17.0716 2.73146 17.0552 2.73146 17.0223V15.5668C2.73146 14.5041 3.29715 13.5217 4.21629 12.9883C5.02979 12.5161 6.03367 12.5152 6.84804 12.9858L13.4107 16.7783Z"
                  fill="currentColor"
                ></path>
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
