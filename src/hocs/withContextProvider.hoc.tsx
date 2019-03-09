import * as React from 'react';
import { Provider as ContextProvider } from '../context/appStore';

const withContextProvider = (Comp: React.SFC) => (props: any) => (
  <ContextProvider>
    <Comp {...props} />
  </ContextProvider>
);

export default withContextProvider;
