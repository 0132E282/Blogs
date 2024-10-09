"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import {  z } from "zod"
import { PostForm } from "@/components/posts";
import { AdminLayout } from "@/layouts";
import { NextPageWithLayout } from "@/models";
import { useForm } from "react-hook-form";
import usePosts from "@/hook/usePosts";
import { useState } from "react";
import { useRouter } from "next/router";

const formSchema = z.object({
    title: z.string().min(2,'Số ký tự ích nhất phải 2 ky tự').max(50, 'Độ dài ký tự phải không vượt quá 50 ký tự'),
    description: z.string(),
    tags: z.array(z.object({value : z.string(), label:z.string()})),
    category: z.string().min(1,'phải chọn danh mục'),
    photo_url: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, { // Limit to 5MB
      message: "Kích thước tệp phải nhỏ hơn 5MB",
    })
    .refine((file) => ["image/jpeg", "image/png", "application/pdf"].includes(file.type), {
      message: "Only JPEG, PNG, or PDF files are allowed",
    }),
    content: z.string().min(10,'phải có nội dung')
});
type TypeFormSchemaCategory = z.infer<typeof formSchema>
const CreatePosts:NextPageWithLayout = function (){
  const {create}  = usePosts({});
  const {query}= useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TypeFormSchemaCategory>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          description:"",
          category: "",
          content: '',
          photo_url: undefined,
          tags: [],
        },
    });
   const handleCreatePosts = function(data:TypeFormSchemaCategory){
     setIsLoading(true);
     const dataRequest = {
      title : data.title,
      category_id : data.category ,
      content : data.content,
      photo_url : data.photo_url,
      tags : data.tags,
      status : 'active', 
      description : data.description,
      type : query.type,
     }
     create(dataRequest);
     setIsLoading(false);
   }
   return <PostForm onSubmit={handleCreatePosts} form={form} isLoading={isLoading}/>
}
CreatePosts.layout = AdminLayout;
export default CreatePosts;