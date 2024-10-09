import { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";
import { User } from "@/models";

export const config = {
  api: {
    bodyParser: false,
  },
};
const proxy = httpProxy.createProxyServer();
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "POST") return res.status(404).json({ error: "method " + req.method + "is not supported" });
  // Lấy dữ liệu từ request body
  return new Promise((resolve) => {
    const handleLoginResponse: ProxyResCallback = function (proxyRes, req, res) {
      let body = "";
      proxyRes.on("data", function (chunk: User) {
        body += chunk;
      });
      proxyRes.on("end", function () {
        const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== "development" });
        try {
          const { JWT, ...data } = JSON.parse(body);
          cookies.set("access_token", JWT.access_token, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(JWT.expires_in * 1000),
          });
          cookies.set("refresh_token", JWT.refresh_token, {
            httpOnly: true,
            sameSite: "lax",
          });
          (res as NextApiResponse).status(200).json({ ...data });
        } catch (err) {
          const { ...data } = JSON.parse(body);
          (res as NextApiResponse).status(data.status_code).json(data);
        }
      });
    };
    proxy.once("proxyRes", handleLoginResponse);
    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_BACKEND_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
    resolve(true);
  });
}
