import { Menu, PropsComponents } from "@/models";
import { Collapse } from '@/components/common';
import { Button } from '@/components/ui';
import Link from "next/link";
import { useState } from "react";
import { IconChevronDown } from "@/utilities/icons";
import { Command } from "../ui/command";

export type PropsTypeMenuItem = PropsComponents & {
  menu: Menu,
} 


export const MenuItem:React.FC<PropsTypeMenuItem>=  function({menu}){
  const [collapseOpen, setCollapseOpen] = useState<boolean>(false);
  const MenuItemButton = menu.children ? Button : Link; 
  return <div  className="flex flex-col mb-1">
    <MenuItemButton 
      href={menu.path ?? ""} 
      variant={'outline'}
      onClick={()=> menu.children && setCollapseOpen(!collapseOpen) } 
      className={'text-start items-center px-4 border-none py-2 flex rounded-lg hover:bg-gray-100 cursor-pointer'}>
           <span> {menu.title}</span>
           {menu.children &&   <span className="ms-auto inline-block"><IconChevronDown width={20} height={20}/></span>}
    </MenuItemButton>
     {menu.children &&  <Collapse className={'ps-4'} open={collapseOpen}>
         <AdminSidebarMenu menus={menu.children}/>
     </Collapse>}
  </div>
}


const AdminSidebarMenu:React.FC<{menus : Menu[]}> = function({menus}){
    return menus.map((menu,index)=>{
      return <MenuItem key={index} menu={menu}/>
    })
  }
export default  AdminSidebarMenu