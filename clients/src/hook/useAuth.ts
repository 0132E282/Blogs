import { authApi } from "@/api-client";
import { TypeAuth } from "@/models";
import useSWR from "swr";
import { PublicConfiguration } from "swr/_internal";

const useAuth = function (option?: Partial<PublicConfiguration>) {
  const { data, error, mutate } = useSWR("/auth/profile", {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...option,
  });
  const user = data?.data;
  async function login(payload: TypeAuth) {
    await authApi.login(payload);
    await mutate();
  }
  async function logout() {
    await authApi.logout();
  }
  return { error, user, login, logout };
};
export default useAuth;
