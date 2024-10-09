import { Menu, NextPageWithLayout } from "@/models";
import AdminLayout from "./admin-layout";
import { Card, CardContent, CardHeader, CardTitle, NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui";
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Link } from "lucide-react";
import { ReactNode } from "react";

const MenuCategories:Menu[] = [
    {
        title : 'tất cả',
        icon : 'list',
        path : '/'
    },
    {
        title : 'hoạt động',
        icon : 'list',
        path :'/admin/categories/trash'
    },
    {
        title : 'ngưng hoạt động',
        icon : 'list',
        path :'/admin/categories/trash'
    },
    {
        title : 'thùng rát',
        icon : 'list',
        path : '/admin/categories/trash'
    }
]
const CategoryLayout:NextPageWithLayout = function({children}:{children:ReactNode}){
    return  <Card>
    <CardHeader>
        <CardTitle className="text-lg px-4">Danh mục sản phẩm</CardTitle>
    </CardHeader>
    <CardContent>
        <NavigationMenu>
            <NavigationMenuList>
                {MenuCategories.map((menuCategory,index) => ( <NavigationMenuItem key={index}>
                    <Link href={menuCategory.path ?? '/'} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            {menuCategory.title ?? ''}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>))}
            </NavigationMenuList>
        </NavigationMenu>
       {children}
    </CardContent>
</Card>
}
CategoryLayout.layout = AdminLayout;
export default CategoryLayout;