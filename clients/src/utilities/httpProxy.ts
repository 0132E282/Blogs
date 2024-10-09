import httpProxy from "http-proxy";

const proxyServer = httpProxy
  .createProxyServer({
    target: process.env.NEXT_PUBLIC_BACKEND_URL,
    changeOrigin: true,
    selfHandleResponse: false,
  })
  .listen(8000);

export default proxyServer;
