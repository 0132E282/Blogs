import { Posts, Menu, TypeActionDataTable} from "@/models";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronRight,PencilLine, Trash,Eye, Pen} from "lucide-react";
import { DataRowActions } from '@/components/common';
import { Button, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui';
import Image from "next/image";

export type PropColumnPost = {
  onDelete:(row:Row<Posts>) => void;
  onEdit:(row:Row<Posts>) => void;
  onView:(row:Row<Posts>) => void;
}


export const columnPost= ({onDelete,onEdit,onView}:PropColumnPost): ColumnDef<Posts>[] =>
   [
    {
        accessorKey: "title",
        header: ({ column,table }) => {
          return ( <div className="flex justify-start items-center"> 
            <Checkbox  checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}/>
            <Button  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} > 
               tên
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         </div>)
        },
        cell: ({ row, getValue }) => {
        const {id} = row.original;
        return  <div className="flex justify-start items-center"  style={{ paddingLeft: `${row.depth * 3}rem`}}>
            <Checkbox value={id ?? 0} checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} className="mr-3"  />
            <div className="mr-4">
              <Image src={'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg'} alt={"thumb"} width={80} height={80}/>
            </div> 
            <div> {row.getCanExpand() ? (
                <>
                <Button variant={'ghost'}  className="px-0 hover:bg-transparent"  onClick = {row.getToggleExpandedHandler()}  style={{ cursor: 'pointer' }}>
                  {getValue<boolean>()}
                  {row.getIsExpanded() ? <ChevronDown className="w-5 h-5 ms-3" /> : <ChevronRight className="w-5 h-5 ms-4"/>}
                </Button>
                </>
              ): getValue<boolean>()}
            </div>
        </div>},
      },
      {
        accessorKey: "user.name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Người tạo
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
      }, 
      {
        accessorKey: "category.name",
        header: ({ column }) => {
          return (
            <Button variant="ghost"  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Danh mục
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
      }, 
      {
        accessorKey: "status",
        header: ({ column }) => {
          return (<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
               Trạng thái
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell : ({row}) =>{
          const {status} = row.original;
          return <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{status =='inactive' ? 'ngừng hoạt động' : 'Hoạt động'}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup value={status}>
              <DropdownMenuRadioItem value="work">Hoạt động</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="inactive">Ngừng hoạt động</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        }
      }, 
      {
        accessorKey: "created_at",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Ngày tạo
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
      },  
      {
        id: "actions",
        cell: ({ row }) => {
          const {id} = row.original;
          const actions:TypeActionDataTable[]= [
            {
              title : 'Xem chi tiết',
              icon:<Eye className="h-5 w-5 ms-auto"/>,
              onClick:()=> onView(row) 
            },
            {
              title : 'Chỉnh sửa',
              icon: <PencilLine className="h-5 w-5 ms-auto"/>,
              onClick:()=> onEdit(row)
            },
            {
              title : 'Xóa',
              icon: <Trash className="h-5 w-5 ms-auto"/>,
              onClick:()=> onDelete(row)
            },
          ];
          return <DataRowActions actions={actions}/>
        },
      }
];
