import { Checkbox, Input, Label} from "@/components/ui"
import {FieldValues,   UseFormReturn } from "react-hook-form"
import FormField from '@/components/common/form-field';
import { useEffect,  useState } from "react"
import slugify from 'slugify';
import {memo} from "react";
type slugGroupProps<T extends FieldValues>={
    className?: string,
    form : UseFormReturn<T>,
    slugSub?: string,
    value: string,
    autoCreateSlug?: boolean,
    isLoading?: boolean,
}
const slugifySlugConfig = {
    replacement: '-',  
    remove: undefined,
    lower: true,      
    strict: false,  
    locale: 'vi',      
    trim: true 
}

const Slug = function ({form, slugSub, value = '', autoCreateSlug, isLoading = false}: slugGroupProps<any>){
    const [isAutoCreateSlug, setIsAutoCreateSlug] = useState(autoCreateSlug);
    const [url, setUrl] = useState('');
    const [slug, setSlug] = useState('');
    useEffect(()=>{
        if(isAutoCreateSlug === true){
            setSlug(slugify(value, slugifySlugConfig));
        }
    },[value, isAutoCreateSlug]);

    useEffect(()=>{
        if(slug !== ''){
            form.setValue('slug',slug);
        }
        setUrl(new URL(window.location.host) + (slugSub ? '/' + slugSub : '') );
    },[form, slug, slugSub]);

    return <FormField form={form} name="slug"  label={url  + '/' + form.watch('slug')} render={({field}) =>
        <div className={'relative'}>
          <Input className={`pl-4 ${isAutoCreateSlug && 'bg-gray-200'}`}  {...field}  disabled={isLoading} readOnly={isAutoCreateSlug} onInput={(e)=>{
            const slug = slugify(e.currentTarget.value, slugifySlugConfig);
            setSlug(slug);
          }}/>
          <Label className={`absolute w-12 h-10 top-0 right-0 border-l flex cursor-pointer`} >
              <Checkbox className="m-auto"  onClick={()=>setIsAutoCreateSlug(!isAutoCreateSlug)} checked={isAutoCreateSlug} disabled={isLoading} />
          </Label>
    </div>}/> 
}

export default memo(Slug);