"use client";
import { ColumnDef, ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, OnChangeFn, PaginationState,Row,SortingState, useReactTable } from "@tanstack/react-table";
import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow,Skeleton } from "@/components/ui";
import { ChevronDown,} from "lucide-react";
import { ReactNode} from 'react'
import Link from "next/link";
import { ActionTable, UseDataTableProps } from "@/models";


export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
  isLoading?: boolean,
  onSearch?:  (event: React.ChangeEvent<HTMLInputElement>) => void,
  pagination?: PaginationState,
  rowCount?: number,
  pageCount?: number,
  expanded?: ExpandedState,
  sorting?: SortingState | [],
  onSortingChange: OnChangeFn<SortingState>;
  onExpandedChange: OnChangeFn<ExpandedState>;
  getSubRows?:(originalRow: TData, index: number) => undefined | TData[];
  onPaginationChange?: OnChangeFn<PaginationState>,
  actionTable?:ActionTable<TData>[],
}

const DataTable = <TData,TValue>({actionTable,sorting,expanded,data, columns, isLoading, onSearch, pagination,rowCount,pageCount, ...option}: DataTableProps <TData,TValue>) => {
  const table = useReactTable({
    data: data ?? [],
    rowCount: rowCount ,
    pageCount: pageCount,
    columns,
    state: {pagination, expanded, sorting},
    getExpandedRowModel : getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getRowId:(originalRow: TData, index: number) =>  originalRow?.id ??  index, 
    ...option
  });
  return (
  <>
    <div className="flex items-center justify-between py-4">
      <Input  placeholder="tìm kiếm tên danh mục tên người dùng ..."  onInput={onSearch} />
       <div className="flex items-center justify-end">
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" >
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
          </DropdownMenu>
          {actionTable?.map((action,index) => {
            return <Button key={index} className={`ms-2 ${action?.classname}`} onClick={()=>{ action?.onClick?.(table?.getSelectedRowModel()?.flatRows ?? [])}}>
                {action.path ? <Link className="flex" href={action.path}>{action?.icon} <span className="ms-2" >{action.text}</span></Link> : <>{action?.icon} <span className="ms-2" >{action.text}</span></> }
              </Button>
          } )}
       </div>
    </div>
    <div className="flex mb-4">
       <div className="flex-1 text-md text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} đã chọn {" "} 
          {table.getFilteredRowModel().rows.length}
       </div>
       <div className="text-md text-muted-foreground">
            {table.getState().pagination.pageIndex + 1} trang {' '}
            {table.getPageCount().toLocaleString()}
       </div>
    </div>
    <div className="rounded-md border ">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext() )}
                </TableHead>))}
            </TableRow> ))}
        </TableHeader>
        <TableBody>
          {isLoading ? [...Array(12)].map((_,index) =>
            <TableRow key={index}> 
             {table.getAllColumns().map((_,index)=>  <TableCell key={index}><Skeleton className="w-[100%] h-[20px] rounded-full" /></TableCell>)}
          </TableRow>
          ):
          table.getRowModel().rows?.length ?(table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell> ))}
              </TableRow>)))
            :(<TableRow>
              <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>)
          }
        </TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-md text-muted-foreground">
            {table.getState().pagination.pageIndex + 1} trang {' '}
            {table.getPageCount().toLocaleString()}
       </div>
        <div className="space-x-2 flex"> 
            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={isLoading || !table.getCanPreviousPage()} >
                Trước đó
            </Button>
            <Button onClick={() => table.nextPage()}  disabled={ isLoading || !table.getCanNextPage()} variant="outline"  size="sm">
                Kế tiếp
            </Button>
        </div>
    </div>
  </>
)};

export default DataTable;