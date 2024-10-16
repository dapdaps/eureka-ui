import Link from 'next/link';

import { StyledFoot } from './styles';

const ModalFoot = (props: Props) => {
  const { children, href, label = 'Manage exist assets on' } = props;

  return (
    <StyledFoot>
      <span className="label">{label}</span>
      {href ? (
        <Link href={href} className="value">
          {children}
        </Link>
      ) : (
        <span className="value">{children}</span>
      )}
    </StyledFoot>
  );
};

export default ModalFoot;

interface Props {
  children: any;
  label?: any;
  href?: string;
}
