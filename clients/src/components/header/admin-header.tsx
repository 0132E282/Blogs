import {Dropdown} from "@/components/common";
import { useAuth } from "@/hook";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../ui";
import { CreditCard, Keyboard, LogOut, Mail, MessageSquare, Settings, User, UserPlus, Users } from "lucide-react";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";

type TypeMenuUser = {
    id : number,
    title : string,
    icon : string,
    link ?: string,
    children: TypeMenuUser[] | null,
    active: boolean | null,
    action?: ()=>void,
}




const AdminHeader = function(){
    const {user, logout} = useAuth();
    const route = useRouter();
    const MenuUser:TypeMenuUser[] = [
        {
            id : 1,
            title : 'trang cá nhân',
            icon : '',
            link : '/user/profile',
            children: null,
            active: null,
        },
        {
            id : 3,
            title : "Quên mật khẩu",
            icon : '213',
            link : '/user/forgot-password',
            children: null,
            active: null,
        },
        {
            id : 2,
            title : 'đăng xuất',
            icon : '12',
            action: ()=>{
                logout()
                route.push('/login');
            },
            children: null,
            active: null,
        },
    ];
    return <div className={'px-4 py-3 bg-white border-b columns-2'}>
        <div> Flex</div>
        <div className="flex">
            <div className="ms-auto ">
                <DropdownMenu>
                    <DropdownMenuTrigger className="border py-1  px-4 rounded-lg max-w-[180px] w-full">
                        {user ? user.name : 'admin'}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="left-[-20px] bg-white w-[170px] border shadow-lg rounded-lg">
                        <DropdownMenuLabel className="text-center py-2">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {MenuUser.map(function(menu,index){
                            const Type = menu.link ? Link : 'button';
                            return <DropdownMenuItem key={menu.id || index}>
                                <Type key={menu.id} href={menu.link ?? ''}  onClick={menu.action}  className="block px-4 py-2 text-sm text-gray-700" role="menuitem" >{menu.title}</Type>
                        </DropdownMenuItem>  
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
      </div>
    </div>
}

export default AdminHeader;