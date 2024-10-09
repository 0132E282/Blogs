import { PostForm } from "@/components/posts";
import usePosts from "@/hook/usePosts";
import { AdminLayout } from "@/layouts";
import { NextPageWithLayout } from "@/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const PostPageEdit:NextPageWithLayout = function (){
    const {find}  = usePosts({});
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
    useEffect(function(){
       (async function(){
        if(query.id){
          const res = await find(query.id as string);
          if(res?.data){
           const post = res.data;
             form.reset({
                 title : post.title || "",
                 category: post.category.id.toString(),
                 tags : post.tags,
                 photo_url: post.photo_url ? new File([""], post.photo_url) : undefined,
                 description : post.description ?? '',
                 content: post.content ?? ""
             });
           }
        }  
       })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[query,query.id])
     const handleCreatePosts = function(data:TypeFormSchemaCategory){
       
     }
     return <PostForm onSubmit={handleCreatePosts} form={form} isLoading={isLoading}/>
}

PostPageEdit.layout = AdminLayout

export default PostPageEdit