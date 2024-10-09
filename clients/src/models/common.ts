import { LucideProps } from "lucide-react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ForwardRefExoticComponent, ReactElement, ReactNode, RefAttributes } from "react";

export type PropsLayouts = {
  children: ReactNode;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: (props: PropsLayouts) => ReactNode;
  children?: ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type Icon = {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
};

export type Menu = {
  title: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  path?: string;
  children?: Array<Menu>;
  key?: number;
};

export type PropsComponents = {
  children?: ReactNode | ReactElement<any>;
  className?: string;
  style?: React.CSSProperties;
};

export type DataTable<T> = {
  data: T;
};
