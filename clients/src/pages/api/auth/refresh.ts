import { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";
const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== "POST") return res.status(404).json({ error: "method " + req.method + "is not supported" });

  return new Promise((resolve, reject) => {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access_token") ?? null;
    if (!accessToken) return res.status(404).json("access_token is required");

    const refreshToken = cookies.get("refresh_token") ?? null;
    if (!refreshToken) return res.status(404).json("access_token is required");

    req.headers.Authorization = `Bearer ${accessToken}`;
    req.body = {
      refresh_token: refreshToken,
    };
    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", function (chunk) {
        body += chunk;
      });
      proxyRes.on("end", function () {
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
          (res as NextApiResponse).status(200).json(data);
        } catch (err) {
          (res as NextApiResponse).status(500).json({ error: "Internal Server Error" });
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
