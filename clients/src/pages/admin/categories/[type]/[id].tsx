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
import {useEffect} from 'react';
const formSchema = z.object({
    name: z.string().min(2,'Số ký tự ích nhất phải 2 ky tự').max(50, 'Độ dài ký tự phải không vượt quá 50 ký tự'),
    description: z.string(),
    category: z.string(),
    slug: z.string().min(1,'Số ký tự ích nhất phải là 1 ký tự'),
});

type TypeFormSchemaCategory = z.infer<typeof formSchema>


const UpdateCategory:NextPageWithLayout = function (){
    const {query, ...router} = useRouter();
    const {find, update} = useCategory({});
    const [isLoading,setIsLoading] = useState(false);
    const [isAlertMessageStatus, setIsAlertMessageStatus] = useState(false);
    const [propsAlertMessage, setPropsAlertMessage] = useState<typeAlertMessage>({
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

    const handleUpdateCategory: SubmitHandler<TypeFormSchemaCategory> = async function (formData) {
      setIsLoading(true);
        const data = {
          name: formData.name,
          description: formData.description,
          slug: formData.slug,
          type: query.type,
          parent_id:formData.category === "null" ? null : formData.category
        };
      const res = await update(String(query.id), data);
      if(res){
        setPropsAlertMessage({
          message: 'Cập nhập danh mục thành công',
          type:'success',
          actions:[
            {
              title: 'Quay lại',
              onClick: () => router.push(`/admin/categories/${query.type}`)
            },
            {
              title: 'Tiếp tục chỉnh sữa',
              onClick: () => {
                 setIsAlertMessageStatus(false)                
              }
            },
            {
              title: 'Xem chi tiết',
              onClick: () => router.push(`/admin/categories/${query.type}`)
            },
          ],
        })
        setIsAlertMessageStatus(true)
      }
      setIsLoading(false);
    }

    useEffect(()=>{
      (async(id, form)=>{
        setIsLoading(true);
        if(id){
          const res = await find(id as string);
          if(res?.data){
            form.reset({ ...res?.data, category: String(res?.data?.parent?.id)});
          }
        }
        setIsLoading(false);
      })(query.id, form)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[router.isReady, query.id]);
 
    return <>
      <FormCategory form={form} onSubmit={handleUpdateCategory} isLoading={isLoading} />
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
UpdateCategory.layout = AdminLayout
export default UpdateCategory;