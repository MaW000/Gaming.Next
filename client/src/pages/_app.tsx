import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import type { AppTypeWithLayout } from "../types/NextExtensions";
import { getSessionWrappedComponent } from '../utils/NextUtils';

const MyApp: AppTypeWithLayout = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return getSessionWrappedComponent(Component, session, pageProps)
};

export default trpc.withTRPC(MyApp);
