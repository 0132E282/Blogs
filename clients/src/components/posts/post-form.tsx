"use client"
import FormField from "@/components/common/form-field";
import { Card, Input, Textarea, Button} from "@/components/ui";
import { FieldValues, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { Form, InputImage } from "@/components/common";
import { useRef } from "react";
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import SunEditorCore from "suneditor/src/lib/core";
import MultipleSelector from "@/components/ui/multi-select";
import { CategoryMultiLevel } from "@/components/category";
import { RotateCw, SquarePen } from "lucide-react";
const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

const optionsEditor = {
    buttonList: [
        // Keep existing buttons and add the "link" option
        ['undo', 'redo', 'bold', 'underline', 'italic'], // Existing options
        ['font', 'fontSize', 'formatBlock'], // Adding link option
        ['list', 'align', 'fontColor', 'hiliteColor','table','horizontalRule','blockquote'],
        ['video','audio','image', 'link'],
        ['fullScreen']// Additional toolbar options
      ],
      formats: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], // Define the heading options
};

type PostFormProps<T extends FieldValues> = {
  isLoading?: boolean,
  onSubmit:SubmitHandler<T>,
  form:UseFormReturn<T>,
}

 const PostForm = function<T extends FieldValues>({onSubmit, form, isLoading= false}:PostFormProps<T>){
    const editor = useRef<SunEditorCore>();
    const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };

    return <Form className="h-full" form={form}  onSubmit={onSubmit}>
    <div className="flex gap-4 h-full w-full">
    <Card className="p-8 flex-1">
       <FormField  form={form} name='title' label="Tiêu đề bài viết" render={({field})=> <Input {...field} 	disabled={isLoading}/> }/>
       <FormField  className="mt-4 " form={form} name="description" label="Mô tả Bài viết" render={({field})=> <Textarea {...field} disabled={isLoading}/>} />
       <FormField className="mt-4" form={form} name="content"  label="Nội dung"  render={({field})=>
           <SunEditor 
                {...field}
                getSunEditorInstance={getSunEditorInstance} 
                setOptions={optionsEditor} 
                height={'450px'}
            />
       }/>
       <Button className="mt-4" type="submit" disabled={isLoading}>
            {isLoading && <RotateCw className="w-5 h-5 mr-2 animate-spin"/>} 
            Đăng bài <SquarePen className="w-5 h-5 ml-2"/>
       </Button>
    </Card>
    <Card className="w-full max-w-[400px] p-8">
        <FormField  form={form} name="photo_url" render={({ field }) => <InputImage maxFiles={1} disabled={isLoading} {...field} onDropImage={(files) => {
            if (files.length) {
                field.onChange(files[0]);
            }
        }} />} />
        <FormField  className="mt-4" form={form} name="category" label="chọn danh mục" render={({ field }) => <CategoryMultiLevel disabled={isLoading}  onChange={(value)=>field.onChange(value)} {...field} /> } />
       
    </Card>
</div> 
</Form>
}
export default PostForm