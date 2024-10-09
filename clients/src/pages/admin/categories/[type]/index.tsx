import { DataTableCategory } from "@/components/category";
import { PropColumnCategory } from "@/components/category/columns-category";
import {CardHeader,CardContent, Card, useToast, Button, AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui";
import { useCategory } from "@/hook";
import { UseCategoryPros } from "@/hook/useCategory";
import { AdminLayout } from "@/layouts";
import { ActionTable, Category, NextPageWithLayout } from "@/models";
import { Row } from "@tanstack/react-table";
import { CirclePlus, Trash } from "lucide-react";
import { useRouter } from "next/router";
import {  useMemo,  useState } from "react";


const CategoriesPage:NextPageWithLayout = () => {

    const {toast} = useToast()
    const {query, ...router} = useRouter();
    const [params, setParams] = useState<UseCategoryPros['params']>({});
    const {data,pagination, isLoading, remove} = useCategory({params: {...params, get : 'detail', type : query.type}});
    const [listCategoryActive, setListCategoryActive] = useState<Array<{data:Category, loading: boolean}>>([]);
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);
    const actionDataTable:ActionTable<Category>[]= useMemo(()=> [
      {
        text : 'thêm mới',
        icon :  <CirclePlus className='w-5 h-5 mt-[0.5px]'/>,
        path : `/admin/categories/${query.type}/create`,
      },
      {
        text : 'Xóa nhiều',
        icon :  <Trash className='w-5 h-5 mt-[0.5px]'/>,
        classname : 'bg-red-600 hover:bg-red-500',
        onClick : (rows:Row<Category>[]) => {
            setListCategoryActive(rows.map(row => ({data:row.original, loading : false})));
            setIsConfirmDelete(true)
        }
      }
    ],[query.type]);
  const actionsRow:PropColumnCategory = useMemo(()=>({
    onDelete : function (row:Row<Category>){
      setListCategoryActive([{data: row.original, loading : false}]);
      setIsConfirmDelete(true)
    },
    onEdit : function(row:Row<Category>) {
      router.push(`/admin/categories/${query.type}/${row.original.id}`);
    },
    onView : function(row:Row<Category>)  {
    }
  }),[query.type, router, toast]);
  return (<>
    <Card >
      <CardHeader className="border-b">
        adasd
      </CardHeader>
      <CardContent>
          <DataTableCategory
              actions={actionDataTable}
              DataTableCategory={data ?? []} 
              paginationCategory={pagination ?? {}} 
              isLoading={isLoading} 
              setParams={setParams}
              actionsRow={actionsRow}
            />
      </CardContent>
    </Card>
    <AlertDialog onOpenChange={setIsConfirmDelete} open={isConfirmDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa Danh Mục</AlertDialogTitle>
          <AlertDialogDescription>
             Xóa danh mục
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <Button onClick={()=>{
             listCategoryActive.forEach(async (category)=>await remove(category.data));
             toast({
              title: "Xóa Danh Mục",
              description: "Bạn đã xóa thành công danh mục",
             })
             setIsConfirmDelete(false);
          }}>đồng ý xóa</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>);
};
CategoriesPage.layout = AdminLayout
export default CategoriesPage;

function setListCategoryActive(arg0: { data: Category; loading: boolean; }[]) {
  throw new Error("Function not implemented.");
}
