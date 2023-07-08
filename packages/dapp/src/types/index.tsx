import { ReactNode, ReactElement } from "react";
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

// Components
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
export interface Props {
    children: ReactNode;
}

// Contract

// Data
export type Whitelisted = {
    id: number
    address: string
}