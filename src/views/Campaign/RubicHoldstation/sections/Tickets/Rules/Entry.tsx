import { useState } from 'react';

import Rules from '@/views/Campaign/RubicHoldstation/sections/Tickets/Rules/index';
import { StyledEntry } from '@/views/Campaign/RubicHoldstation/sections/Tickets/Rules/styles';

const RulesEntry = () => {
  const [rulesVisible, setRulesVisible] = useState(false);

  return (
    <>
      <StyledEntry onClick={() => setRulesVisible(true)}>
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9.26562" cy="9" r="8.5" stroke="white" />
          <path
            d="M8.17541 13.0588V6.65084H9.67541V13.0588H8.17541ZM8.93141 5.59484C8.65141 5.59484 8.41941 5.50684 8.23541 5.33084C8.05941 5.15484 7.97141 4.94284 7.97141 4.69484C7.97141 4.43884 8.05941 4.22684 8.23541 4.05884C8.41941 3.88284 8.65141 3.79484 8.93141 3.79484C9.21141 3.79484 9.43941 3.87884 9.61541 4.04684C9.79941 4.20684 9.89141 4.41084 9.89141 4.65884C9.89141 4.92284 9.80341 5.14684 9.62741 5.33084C9.45141 5.50684 9.21941 5.59484 8.93141 5.59484Z"
            fill="white"
          />
        </svg>
        Rules
      </StyledEntry>
      <Rules visible={rulesVisible} onClose={() => setRulesVisible(false)} />
    </>
  );
};

export default RulesEntry;
