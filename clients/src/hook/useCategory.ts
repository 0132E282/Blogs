import { categoriesApi } from "@/api-client";
import { queryKey } from "@/constants";
import { Category, ListParams } from "@/models";
import useSWR from "swr";
import { SWRConfiguration } from "swr/_internal";

export interface UseCategoryPros {
  params?: Partial<ListParams>;
  id?: string;
  options?: SWRConfiguration;
  find?: string | string[];
}

const useCategory = function ({ params, options = {} }: UseCategoryPros) {
  const { data, error, mutate } = useSWR([queryKey.CATEGORY_KET, params], () => categoriesApi.all(params || {}), {
    dedupingInterval: 5 * 1000,
    ...options,
  });

  async function update<Data>(id: string | string[], data: Data) {
    try {
      const res = await categoriesApi.update(id, data);
      mutate();
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async function remove(category: Category) {
    try {
      const res = await categoriesApi.delete(category);
      mutate();
      return res;
    } catch (err) {
      console.log(err);
    }
    // Refetch the data to remove the deleted category from the cache.
  }

  async function create<Data>(data: Data) {
    try {
      return await categoriesApi.create(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function find(id: string | number) {
    try {
      const category = await categoriesApi.find(id);
      return category;
    } catch (err) {
      console.log(err);
    }
  }
  return {
    data: data?.data,
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
export default useCategory;
