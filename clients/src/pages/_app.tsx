import { SWRConfig } from 'swr';
import { Toaster } from "@/components/ui/toaster";
import { EmptyLayout } from "@/layouts";
import { AppPropsWithLayout } from "@/models";

import "@/styles/globals.css";
import axiosClient from '@/api-client/axios-clients';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.layout ?? EmptyLayout;
  return <SWRConfig value={{ fetcher : url => axiosClient.get(url), shouldRetryOnError : false }}> 
       <Layout> 
          <Component {...pageProps} />
          <Toaster />
       </Layout>  
  </SWRConfig> ;
}
