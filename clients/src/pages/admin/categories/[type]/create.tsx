"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminLayout } from "@/layouts";
import { NextPageWithLayout } from "@/models";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"
import { useRouter } from "next/router";
import { FormCategory } from "@/components/category";
import { useCategory } from "@/hook";
import { useState } from "react";
import { AlertMessage } from "@/components/common";
import { typeAlertMessage } from "@/components/common/alert-message";

const formSchema = z.object({
    name: z.string().min(2,'Số ký tự ích nhất phải 2 ky tự').max(50, 'Độ dài ký tự phải không vượt quá 50 ký tự'),
    description: z.string(),
    category: z.string(),
    slug: z.string().min(1,'Số ký tự ích nhất phải là 1 ký tự'),
});

type TypeFormSchemaCategory = z.infer<typeof formSchema>


const Create:NextPageWithLayout = function (){
    const {query, ...router} = useRouter();
    const {create} = useCategory({});
    const [isLoading,setIsLoading] = useState(false);
    const [isAlertMessageStatus, setIsAlertMessageStatus] = useState(false);
    const [propsAlertMessage,setPropsAlertMessage] = useState<typeAlertMessage>({
      message: '',
      type:'default',
      actions:[],
    });
    const form = useForm<TypeFormSchemaCategory>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description:"",
          category: "",
          slug:''
        },
    });

    const handleSubmitCreateCategory: SubmitHandler<TypeFormSchemaCategory> = async function (formData) {
        setIsLoading(true);
        const {category: parent_id, ...restData } = formData;
        const res = await create({parent_id, type: query.type, ...restData});
        setIsLoading(false);
        setIsAlertMessageStatus(true)
        if(res){
            setPropsAlertMessage({
              type : 'success',
              message : 'Thêm danh mục thành công!',
              actions:[
                {
                  title: 'Quay lại',
                  onClick: () => router.push('/admin/categories/'+query.type),
                },
                {
                  title: 'Chỉnh sửa',
                  onClick: () => router.push(`/admin/categories/${query.type}/${res.data.id}`),
                },
                {
                  className : "bg-white border text-primary hover:text-white hover:bg-primary",
                  title: 'Tạo thêm',
                  onClick: () =>   form.reset(),
                },
              ],
            })
        }else{
          setPropsAlertMessage({
            type : 'error',
            message : `Thêm danh mục bài đăng thất bại Lỗi (500)`,
            actions:[
              {
                title: 'Quay lại',
                onClick: () => setIsAlertMessageStatus(false),
              },
            ],
          })
        }
    }
    return <>
      <FormCategory form={form} onSubmit={handleSubmitCreateCategory} isLoading={isLoading} autoCreateSlug={true}/>
      <AlertMessage 
        title="Tạo Danh Mục Bài Đăng" 
        type={propsAlertMessage?.type} 
        open={isAlertMessageStatus} 
        message={propsAlertMessage.message} 
        actions={propsAlertMessage.actions} 
        onOpenChange={setIsAlertMessageStatus}
      />
    </>
}
Create.layout = AdminLayout
export default Create;