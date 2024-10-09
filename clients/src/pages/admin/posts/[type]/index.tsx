import { DataTablePosts } from "@/components/posts";
import { PropColumnPost } from "@/components/posts/data-table-post/column-posts";
import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import usePosts from "@/hook/usePosts";
import { AdminLayout } from "@/layouts";
import { NextPageWithLayout, Posts } from "@/models";
import Link from "next/link";
import { useRouter } from "next/router";

const menus = [
    {
        'name':  'Tất cả',
        'url': '',
    },
    {
        'name': 'Vi phạm', 
        'url': '',
    },
];


const PostsAdminPage:NextPageWithLayout = function (){
    const {query, ...router} = useRouter();
    const { res, isLoading } = usePosts({params:{type: query.type} });
    const actionsRow:PropColumnPost={
        onEdit (row) {
            router.push(`/admin/post/${query.type}/${row.id}`)
        },
        onDelete () {

        },
        onView () {

        }
    }
    return <><Card>
    <CardHeader className="border-b">
     <div className="flex-1">
        {menus.map((menu,index) => <Button className="mr-2" variant={'link'} key={index} >
          <Link href={menu.url}>{menu.name}</Link>
       </Button>)}
     </div>
    </CardHeader>
    <CardContent>
        <DataTablePosts data={res?.data ?? []} isLoading={isLoading} actionsRow={actionsRow}/>
    </CardContent>
  </Card></>
}

PostsAdminPage.layout = AdminLayout;
export default PostsAdminPage;