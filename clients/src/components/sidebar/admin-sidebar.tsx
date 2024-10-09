import { Menu } from '@/models';
import React from 'react'
import Link from 'next/link';
import {Bell, Package2, User } from 'lucide-react';
import {Accordion, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, AccordionItem, AccordionTrigger, AccordionContent } from '../ui';

export type PropsAdminSidebar = {

}
const menus:Menu[] = [
  {
    title: 'Bài Đăng',
    icon: User, 
    path: '',
    children: [
      {
        title: 'Danh mục sản phẩm',
        icon: User,
        path: '/admin/categories/blogs'
      },
      {
        title: 'Bài đăng tin tức',
        icon: User,
        path: '/admin/blogs'
      },
    ]
  },
  {
    title: 'Thiết lập hệ thống',
    icon: User, 
    path: '/admin/Products',
  },
];

const MenuItemLink = function({menu}:{menu:Menu} ){
  const {icon:Icon } = menu;
  return <Link href={menu.path?? ""} className="w-full !py-2 px-3 font-medium hover:bg-gray-50 flex justify-start items-center">
     {Icon && <Icon size="25" className="mr-2"/> }
    {menu.title}
  </Link>
}

const MenuItemWrapper = function({menu}:{menu:Menu}){
  const {icon:Icon } = menu;
  return <>
   { menu.children ? <AccordionItem value="item-1" className='border-0'>
        <AccordionTrigger className='!py-3 px-3 hover:bg-gray-50'> {menu.title}</AccordionTrigger>
        <AccordionContent>
          {menu.children.map(function (childMenu, index){
              return <MenuItemLink menu={childMenu} key={index}/>
          })}
        </AccordionContent>
      </AccordionItem> :  <MenuItemLink menu={menu} />
    }
  </>
}
const AdminSidebar:React.FC<PropsAdminSidebar> = (props) => {
  return (<div className="flex h-full max-h-screen flex-col gap-2">
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Package2 className="h-6 w-6" />
        <span className="">Acme Inc</span>
      </Link>
      <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
    </div>
    <div className="flex-1">
        <Accordion type="multiple"  className="w-full">
          {menus.map((menu, index) => <MenuItemWrapper menu={menu} key={index}/>)}
        </Accordion>
    </div>
  </div>)
}

export default AdminSidebar