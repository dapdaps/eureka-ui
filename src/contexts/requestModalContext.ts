import { createContext } from 'react';

export default createContext<any>({
  openRequestModal: () => {},
  isOpenRequestModal: false,
});
