"use client"

import {Form} from "@/components/common"
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea } from "@/components/ui"
import { LoaderCircle } from "lucide-react"
import {FieldValues,  SubmitHandler,  UseFormReturn } from "react-hook-form"
import Slug from "../common/slug"
import React, { useEffect, memo, useState} from 'react'
import FormField from '@/components/common/form-field';
import { useCategory } from '@/hook';
import SelectCategoryMultiLevel from './select-category-multi-level';
import { useRouter } from 'next/router';

export type PropsFormCategory<T extends FieldValues>={
  isLoading?: boolean,
  onSubmit:SubmitHandler<T>,
  form:UseFormReturn<T>,
  autoCreateSlug?: boolean,
}
const FormCategory =function<T extends FieldValues>({onSubmit, isLoading = false, form, autoCreateSlug = false}:PropsFormCategory<any>) {
  const {query} = useRouter();
  const {data} = useCategory({params: {limit: 100, page:1 , get: 'detail', type: query.type}});
  return (<Form<T> form={form} onSubmit={onSubmit}>
         <Card className="mb-4">
           <CardHeader>
              <CardTitle>Đường dẫn</CardTitle>
           </CardHeader>
           <CardContent>
              <Slug form={form} value={form.watch('name')?.toString() ?? ''} autoCreateSlug={autoCreateSlug } isLoading={isLoading}/>
           </CardContent>
         </Card>
         <Card>
          <CardHeader>
            <CardTitle> Thông tin cơ bản</CardTitle>
          </CardHeader>
          <CardContent>
              <FormField  form={form} name='name' label="Tên Danh mục" render={({field})=> <Input {...field} disabled={isLoading}/> }/>
              <FormField  form={form}  name='category' className="mt-4"  label="Danh mục cha" render={({field}) => 
                  <SelectCategoryMultiLevel 
                      disabled={isLoading  || !(data && data.length > 0) } 
                      onValueChange={field.onChange} value={field.value} 
                      placeholder={ !(data && data.length > 0) ? "không có danh mục nào" : "chọn danh mục cha"} 
                      categories={data ?? []}
                  />
              }/>
              <FormField  className="mt-4 " form={form} name="description" label="Mô tả danh mục" render={({field})=><Textarea  {...field} disabled={isLoading}/>}/>
          </CardContent>
        </Card>
        <Button className="mt-4"  disabled={isLoading}> {isLoading && <LoaderCircle className="animate-spin h-4 w-4 mr-1 " />} Tạo Danh mục</Button>
  </Form>)
}

export default FormCategory;
