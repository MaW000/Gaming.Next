/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextComponentType, NextPage } from 'next';
import type { AppInitialProps } from 'next/app';
import type { AppContextType, NextPageContext } from 'next/dist/shared/lib/utils';
import type { NextRouter } from 'next/router';
import type { ReactElement, ReactNode } from 'react';

export type AppTypeWithLayout = NextComponentType<
  AppContextType,
  AppInitialProps,
  AppPropsTypeWithLayout
>;

type AppPropsTypeWithLayout<
  R extends NextRouter = NextRouter,
  P = Record<string, unknown>,
> = AppInitialProps & {
  Component: NextComponentType<NextPageContext, unknown, P> & {
    getLayout: (page: React.ReactNode) => ReactElement<any, any> | null;
  };
  router: R;
  __N_SSG?: boolean;
  __N_SSP?: boolean;
  __N_RSC?: boolean;
};

export type PageWithLayout = NextPage & {
  getLayout: (page: React.ReactNode) => ReactElement<any, any> | null;
};
