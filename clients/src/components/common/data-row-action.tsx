import Link from "next/link";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui"
import {Eye, MoreHorizontal, PencilLine, Trash} from 'lucide-react';
import { TypeActionDataTable } from "@/models";

type TypePropsActionDataTable = {
  actions :TypeActionDataTable[]
};

const DataRowActions = function({actions}:TypePropsActionDataTable){
    return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost"  className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[150px]">
        {actions?.map((action,index)=> {
          return <DropdownMenuItem key={index} className="text-md cursor-pointer"onClick={()=>action.onClick?.()}>
             { action.path?<Link className="flex justify-between w-full item-center bg-transparent" href={action?.path}> {action.title} {action?.icon}</Link>  :
              <>{action.title} {action?.icon}</>
             }
          </DropdownMenuItem>
        })}
    </DropdownMenuContent>
  </DropdownMenu>
}
export default DataRowActions;