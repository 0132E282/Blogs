
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, Input, Textarea } from '@/components/ui';
import FormField from '@/components/common/form-field';
import { useCategory } from '@/hook';
import SelectCategoryMultiLevel from './select-category-multi-level';
import { useRouter } from 'next/router';
type Props = {
    form: any
}
const CardCategory = ({form}: Props) => {
  const {query} = useRouter();
  const {data} = useCategory({params: {limit: 100, page:1 , get: 'detail', type: query.type}});
  return (<Card>
    <CardHeader>
      <CardTitle>Thông tin cơ bản</CardTitle>
    </CardHeader>
    <CardContent>
        <FormField  form={form} name='name' label="Tên Danh mục" render={({field})=> <Input {...field}/> }/>
        <FormField  form={form}  name='category' className="mt-4"  label="Danh mục cha" render={({field}) => 
            <SelectCategoryMultiLevel disabled={!(data && data.length > 0)} onValueChange={field.onChange} value={field.value} placeholder={ !(data && data.length > 0) ? "không có danh mục nào" :"chọn danh mục cha"} categories={data ?? []} />
        }/>
        <FormField  className="mt-4 " form={form} name="description" label="Mô tả danh mục" render={({field})=> <Textarea  {...field}/>}/>
    </CardContent>
 </Card>)
}

export default CardCategory