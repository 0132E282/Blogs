import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
export const config = {
  api: {
    bodyParser: false,
  },
};
const proxy = httpProxy.createProxyServer();
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "POST") return res.status(404).json({ message: "method not supported" });
  return new Promise((resolve, reject) => {
    const cookies = new Cookies(req, res);
    cookies.set("access_token", "");
    cookies.set("refresh_token", "");
    res.status(200).json({ message: "logout successful" });
    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_BACKEND_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
    resolve(true);
  });
}
