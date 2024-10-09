import { postsApi } from "@/api-client/post-api";
import { queryKey } from "@/constants";
import { ListParams } from "@/models";
import useSWR, { SWRConfiguration } from "swr";

export interface UseCategoryPros {
  params?: Partial<ListParams>;
  id?: string;
  options?: SWRConfiguration;
  find?: string | string[];
}

const usePosts = function (query: UseCategoryPros) {
  const { params, options } = query;
  const { data, error, mutate } = useSWR([queryKey.POST_KEY, params], () => postsApi.all(params || {}), {
    dedupingInterval: 5 * 1000,
    ...options,
  });
  async function update<Data>(id: string | string[], data: Data) {
    try {
      const res = await postsApi.update(id as string, data);
      mutate();
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async function remove(id: string) {
    try {
      const res = await postsApi.delete(id);
      mutate();
      return res;
    } catch (err) {
      console.log(err);
    }
    // Refetch the data to remove the deleted category from the cache.
  }

  async function create<Data>(data: Data) {
    try {
      return await postsApi.create(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function find(id: string | number) {
    try {
      const category = await postsApi.find(id as string);
      return category;
    } catch (err) {
      console.log(err);
    }
  }
  return {
    res: data,
    pagination: data?.pagination,
    error,
    update,
    isLoading: !error && !data,
    isError: error,
    remove,
    mutate,
    create,
    find,
  };
};
export default usePosts;
