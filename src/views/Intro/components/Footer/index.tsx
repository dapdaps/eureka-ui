import { memo } from 'react';
import styled from 'styled-components';

import { StyledFlex, StyledFont } from '@/styled/styles';
const StyledFooterContainer = styled.div`
  padding: 0 20px 30px;
`;
const StyledFooter = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 292px;
  border-radius: 30px;
  background: #ebf479 url('/images/intro/footer-bg.svg') no-repeat center;
  background-size: cover;
`;
const StyledCopyright = styled.div`
  position: absolute;
  right: 22px;
  bottom: 26px;
  color: #000;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledFooterL = styled.div`
  padding-top: 42px;
  padding-left: 37px;
`;
const StyledFooterR = styled.div`
  padding-top: 42px;
  padding-right: 84px;
  display: flex;
  align-items: flex-start;
  gap: 140px;
`;
const StyledLogoImage = styled.img`
  margin-bottom: 107px;
  width: 242px;
`;
const StyledSocialButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: #5b56f3;
  cursor: pointer;
`;

const ABOUT_LIST = [
  {
    label: 'Documentation',
    path: 'https://docs.dapdap.net',
    target: '_blank'
  },
  {
    label: 'Blog',
    path: 'https://dapdap.mirror.xyz',
    target: '_blank'
  },
  {
    label: 'FAQ',
    path: 'https://docs.dapdap.net/user-support/general-faq',
    target: '_blank'
  }
];
const PRODUCT_LIST = [
  {
    label: 'Super Bridge',
    path: '/super-bridge',
    target: '_self'
  },
  {
    label: 'Super Swap',
    path: '/super-swap',
    target: '_self'
  },
  {
    label: 'Chains',
    path: '/networks',
    target: '_self'
  },
  {
    label: 'dApps',
    path: '/alldapps',
    target: '_self'
  },
  {
    label: 'Campaigns',
    path: '/campaigns',
    target: '_self'
  },
  {
    label: 'Portfolio',
    path: '/portfolio',
    target: '_self'
  }
];
const SOCIAL_LIST = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
        <path
          d="M10.7975 8.04613L17.5516 0H15.9516L10.0846 6.98491L5.40206 0H0L7.08242 10.5634L0 19H1.59994L7.79169 11.6221L12.7378 19H18.1399M2.17739 1.2365H4.63535L15.9504 17.8242H13.4919"
          fill="white"
        />
      </svg>
    ),
    label: 'Twitter',
    path: 'https://twitter.com/DapDapMeUp'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="16" viewBox="0 0 26 16" fill="none">
        <path
          d="M12.5971 0.785621C7.5818 0.785621 4.06358 2.70789 4.06358 2.70789C5.99112 1.17007 9.35963 0.284162 9.35963 0.284162L9.04149 0C5.87883 0.050146 3.0156 2.00584 3.0156 2.00584C-0.203207 8.00665 0.0026473 13.1884 0.0026473 13.1884C2.6226 16.2139 6.51511 15.9966 6.51511 15.9966L7.8438 14.4922C5.50456 14.0409 4.02615 12.1855 4.02615 12.1855C4.02615 12.1855 7.54438 14.325 12.5971 14.325C17.6499 14.325 21.1681 12.1855 21.1681 12.1855C21.1681 12.1855 19.6897 14.0409 17.3505 14.4922L18.6792 15.9966C18.6792 15.9966 22.5717 16.2139 25.1917 13.1884C25.1917 13.1884 25.3975 8.00665 22.1787 2.00584C22.1787 2.00584 19.3155 0.050146 16.1528 0L15.8347 0.284162C15.8347 0.284162 19.2032 1.17007 21.1307 2.70789C21.1307 2.70789 17.6125 0.785621 12.5971 0.785621ZM8.72336 7.12073C9.93976 7.12073 10.9316 8.07351 10.9129 9.24358C10.9129 10.3969 9.93976 11.3664 8.72336 11.3664C7.52566 11.3664 6.55254 10.3969 6.55254 9.24358C6.55254 8.07351 7.50695 7.12073 8.72336 7.12073ZM16.5271 7.12073C17.7435 7.12073 18.7166 8.07351 18.7166 9.24358C18.7166 10.3969 17.7435 11.3664 16.5271 11.3664C15.3294 11.3664 14.3563 10.3969 14.3563 9.24358C14.3563 8.07351 15.3107 7.12073 16.5271 7.12073Z"
          fill="white"
        />
      </svg>
    ),
    label: 'Discord',
    path: 'https://discord.gg/dapdap'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="19" viewBox="0 0 24 19" fill="none">
        <path
          d="M8.71985 17.8505L9.07994 12.5365L18.9566 3.84302C19.3939 3.45357 18.8666 3.26513 18.2879 3.60433L6.09636 11.1294L0.823662 9.49627C-0.30804 9.1822 -0.3209 8.41587 1.08087 7.86311L21.6187 0.124434C22.5575 -0.290138 23.4577 0.350564 23.0976 1.7576L19.5996 17.8505C19.3553 18.9937 18.648 19.2701 17.6706 18.7425L12.3464 14.8983L9.78725 17.3229C9.49146 17.6118 9.24712 17.8505 8.71985 17.8505Z"
          fill="white"
        />
      </svg>
    ),
    label: 'Tg',
    path: 'https://t.me/DapDapDiscussion'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 25 18" fill="none">
        <path
          d="M10.8117 14.7997C10.9531 14.7992 11.0915 14.8408 11.2093 14.919C11.327 14.9973 11.419 15.1087 11.4734 15.2393C11.5278 15.3698 11.5422 15.5135 11.5149 15.6523C11.4876 15.791 11.4197 15.9185 11.3199 16.0187C11.22 16.1188 11.0927 16.1871 10.954 16.2149C10.8154 16.2426 10.6716 16.2286 10.5409 16.1746C10.4102 16.1205 10.2985 16.029 10.2199 15.9114C10.1413 15.7939 10.0993 15.6556 10.0993 15.5142C10.0992 15.4205 10.1175 15.3277 10.1532 15.2411C10.1889 15.1545 10.2414 15.0757 10.3075 15.0094C10.3737 14.943 10.4522 14.8904 10.5387 14.8544C10.6252 14.8184 10.718 14.7998 10.8117 14.7997H10.8117ZM21.8299 10.436C21.6885 10.4365 21.5501 10.3949 21.4323 10.3167C21.3145 10.2384 21.2226 10.127 21.1682 9.99644C21.1138 9.86592 21.0993 9.72218 21.1266 9.58343C21.1539 9.44468 21.2218 9.31715 21.3217 9.21701C21.4215 9.11686 21.5488 9.04859 21.6875 9.02084C21.8262 8.99309 21.9699 9.00712 22.1006 9.06113C22.2313 9.11515 22.343 9.20673 22.4217 9.32428C22.5003 9.44184 22.5422 9.58007 22.5422 9.72149C22.5361 9.90727 22.4601 10.0839 22.3295 10.2162C22.1989 10.3484 22.0232 10.4265 21.8375 10.4349L21.8299 10.436ZM21.8299 7.53856C21.2525 7.54057 20.6995 7.77133 20.292 8.18028C19.8845 8.58924 19.6557 9.14304 19.6557 9.72038C19.6553 9.9506 19.6922 10.1794 19.7648 10.3978L12.6041 14.2357C12.4035 13.944 12.1346 13.7058 11.8209 13.5419C11.5071 13.378 11.158 13.2933 10.8041 13.2953C10.401 13.3005 10.0069 13.4149 9.66367 13.6262C9.32042 13.8375 9.04082 14.1378 8.85459 14.4953L2.40623 11.1135C2.01947 10.8247 1.71369 10.4411 1.51839 9.99965C1.3231 9.55824 1.24489 9.07393 1.29131 8.59348C1.28452 8.38657 1.3249 8.18082 1.40938 7.99182C1.49387 7.80281 1.62025 7.6355 1.77895 7.50256C1.87949 7.45387 1.99081 7.43171 2.10233 7.43821C2.21385 7.4447 2.32185 7.47963 2.41605 7.53966C4.14077 8.44295 9.76441 11.4157 9.98913 11.528C10.1769 11.6264 10.3881 11.6713 10.5997 11.6581C10.8112 11.6448 11.0151 11.5738 11.1891 11.4527L22.7364 5.42985C22.8422 5.39777 22.9352 5.33339 23.0025 5.24574C23.0698 5.15808 23.108 5.05155 23.1117 4.9411C23.1046 4.83687 23.0695 4.73648 23.0102 4.65048C22.9509 4.56448 22.8695 4.49605 22.7746 4.45238C22.0993 4.15128 21.087 3.66256 20.1128 3.21092C18.0128 2.22913 15.6139 1.10328 14.5644 0.539282C14.2967 0.384328 13.9928 0.302734 13.6835 0.302734C13.3742 0.302734 13.0703 0.384328 12.8026 0.539282C8.03967 2.94584 1.47895 6.18256 1.10259 6.41166C0.756623 6.65012 0.475649 6.97116 0.285148 7.34568C0.0946477 7.7202 0.0006469 8.13634 0.0116701 8.55638C-0.0435342 9.28493 0.0978089 10.015 0.420949 10.6702C0.74409 11.3255 1.23718 11.8821 1.84877 12.2818L8.67241 15.8186C8.75046 16.3336 9.00789 16.8045 9.39929 17.1482C9.79069 17.4919 10.2909 17.6863 10.8117 17.6971C11.3847 17.6997 11.9356 17.4758 12.3443 17.0741C12.7529 16.6724 12.9863 16.1254 12.9935 15.5524L20.4924 11.4887C20.8165 11.7355 21.2029 11.887 21.6083 11.9264C22.0137 11.9657 22.422 11.8914 22.7875 11.7116C23.153 11.5318 23.4611 11.2537 23.6773 10.9085C23.8936 10.5634 24.0093 10.1648 24.0117 9.75749C24.016 9.46855 23.9631 9.18162 23.8559 8.91326C23.7488 8.64489 23.5895 8.4004 23.3874 8.1939C23.1853 7.9874 22.9442 7.82298 22.6782 7.71013C22.4122 7.59727 22.1264 7.53822 21.8375 7.53638L21.8299 7.53856Z"
          fill="white"
        />
      </svg>
    ),
    label: 'Gitbook',
    path: 'https://docs.dapdap.net/'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18 7.92103V17.7044C18 18.9711 16.8331 20 15.3908 20H2.60923C1.16695 20 0 18.9711 0 17.7044V7.92104C0 3.54747 4.02819 0 9 0C13.9718 0 18 3.54747 18 7.92103ZM9 1.66667C5.07587 1.66667 1.89474 4.46684 1.89474 7.92104V17.7044C1.89474 18.0518 2.21463 18.3333 2.60923 18.3333H15.3908C15.7854 18.3333 16.1053 18.0518 16.1053 17.7044V7.92103C16.1053 4.46684 12.9241 1.66667 9 1.66667Z"
          fill="white"
        />
      </svg>
    ),
    label: 'Mirror',
    path: 'https://dapdap.mirror.xyz/'
  }
];
export default memo(function Footer() {
  return (
    <StyledFooterContainer>
      <StyledFooter>
        <StyledFooterL>
          <StyledLogoImage src="/images/intro/footer-logo.png" />
          <StyledFlex gap="12px">
            {SOCIAL_LIST.map((social) => (
              <StyledSocialButton
                key={social?.label}
                onClick={() => {
                  social?.path && window.open(social?.path, '_blank');
                }}
              >
                {social?.icon}
              </StyledSocialButton>
            ))}
          </StyledFlex>
        </StyledFooterL>
        <StyledFooterR>
          <StyledFlex flexDirection="column" alignItems="fle-start" gap="14px">
            <StyledFont fontSize="18px" fontWeight="700">
              ABOUT
            </StyledFont>
            {ABOUT_LIST.map((about) => (
              <StyledFont
                key={about.label}
                fontWeight="500"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  about?.path && window.open(about?.path, about?.target);
                }}
              >
                {about.label}
              </StyledFont>
            ))}
          </StyledFlex>
          <StyledFlex flexDirection="column" alignItems="fle-start" gap="14px">
            <StyledFont fontSize="18px" fontWeight="700">
              Product
            </StyledFont>
            <StyledFlex
              flexDirection="column"
              flexWrap="wrap"
              alignItems="flex-start"
              gap="14px 50px"
              style={{ height: 120 }}
            >
              {PRODUCT_LIST.map((product) => (
                <StyledFont
                  key={product.label}
                  fontWeight="500"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    product?.path && window.open(product?.path, product?.target);
                  }}
                >
                  {product.label}
                </StyledFont>
              ))}
            </StyledFlex>
          </StyledFlex>
        </StyledFooterR>
        <StyledCopyright>Copyright 2024 DapDap</StyledCopyright>
      </StyledFooter>
    </StyledFooterContainer>
  );
});
