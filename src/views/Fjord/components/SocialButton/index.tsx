import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledSocialButton = styled(motion.div)`
  width: 49px;
  height: 49px;
  border-radius: 10px;
  background: #191a26;
  display: flex;
  align-items: center;
  justify-content: center;
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

export default SocialButton;
