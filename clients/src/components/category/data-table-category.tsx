"use client"
import {useCallback,  useEffect,  useMemo,  useState} from "react";
import { ExpandedState,   PaginationState, SortingState, } from "@tanstack/react-table";

import { useCategory, useDebounce } from '@/hook';
import {ActionTable, Category, ListParams, Pagination } from '@/models';
import { DataTable} from '@/components/common';
import columnsCategory, { PropColumnCategory } from "./columns-category";
import { UseCategoryPros } from "@/hook/useCategory";



export type DataTableCategoryProps = {
  DataTableCategory: Category[],
  paginationCategory: Pagination,
  isLoading: boolean,
  setParams: React.Dispatch<React.SetStateAction<UseCategoryPros['params']>>,
  actionsRow : PropColumnCategory,
  actions:ActionTable<Category>[]
};

const DataTableCategory =  function({DataTableCategory, paginationCategory,actions, isLoading, setParams,  actionsRow}: DataTableCategoryProps){
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [sorting,setSorting] = useState<SortingState>([]);
  const [filter, setFilters] = useState<ListParams>({search : ''});

  const [pagination,setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9
  });

  const searchValueDebounce = useDebounce(filter?.search ?? '', 1000);

  const handlerSearch = useCallback(function(e:React.ChangeEvent<HTMLInputElement>){
    const currentValue = e.currentTarget?.value.trim();
    e.currentTarget.value = currentValue; 
    setFilters(prevFilter => ({  ...prevFilter, search : currentValue}));
 },[]);

  useEffect(()=>{
    setParams({
      ...filter,
      sort: sorting[0]?.id ?? 'created_at',
      sort_type: sorting[0]?.desc ? 'DESC' : 'ASC',
      page:pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search: searchValueDebounce,
    });
  },[filter, sorting, pagination, searchValueDebounce, setParams]);
  
  const dataMemo = useMemo(()=>DataTableCategory,[DataTableCategory]);
  const columnsMemo = useMemo(()=>columnsCategory(actionsRow),[actionsRow]);
  
  return <DataTable
        actionTable={actions}
        columns={columnsMemo ?? []}
        data={dataMemo ?? []}
        sorting={sorting}
        rowCount={paginationCategory?.total ?? 0}
        pageCount ={paginationCategory?.last_page ?? 0}
        onSearch={handlerSearch}
        expanded={expanded}
        pagination = {pagination}
        isLoading={isLoading}
        onSortingChange={setSorting}
        onExpandedChange={setExpanded}
        getSubRows={(row:Category) => row?.children} 
        onPaginationChange={setPagination}
  />;
}



export default DataTableCategory;
