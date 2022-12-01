/* eslint-disable @typescript-eslint/no-explicit-any */
import { SessionProvider } from 'next-auth/react';
import type { ReactElement, ReactNode } from 'react';
import {Container} from '../components/ui/Container'
export const getSessionWrappedComponent = (
  Component: any,
  
  session: any,
  props?: any,
): ReactElement => {
  const getComponent = (): ReactNode => {
    if (Component.getLayout) {
      return Component.getLayout(<Component {...props} />);
    }
    return <Component {...props} />;
  };
  return ( 
    <SessionProvider session={session}>
      <Container>
        {getComponent()}
      </Container>
    </SessionProvider>
    )
};
