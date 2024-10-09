import { DataTable } from "@/components/common"
import { columnPost, PropColumnPost } from "./column-posts"
import { useState } from "react";
import { ExpandedState, PaginationState, SortingState } from "@tanstack/react-table";
import { Posts } from "@/models";

type DataTableProps = {
  data: Posts[],
  isLoading : boolean,
  actionsRow:PropColumnPost
}


const DataTablePosts = function({data, isLoading, actionsRow}:DataTableProps){
    const [expanded, setExpanded] = useState<ExpandedState>({});
    const [sorting,setSorting] = useState<SortingState>([]);
    const [pagination,setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });
    const columnPostData = columnPost(actionsRow) 
    return <DataTable
      columns={columnPostData}
      data={data}
      sorting={sorting}
      rowCount={0}
      pageCount ={ 0}
      expanded={expanded}
      pagination = {pagination}
      isLoading={isLoading}
      onSortingChange={setSorting}
      onExpandedChange={setExpanded}
      onPaginationChange={setPagination}
    />
}

export default DataTablePosts;