import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ChangeEvent} from 'react';

export type PropsFormFieldInput = {
  control: any,
  label?: string,
  placeholder?: string,
  formDescription?: string,
  name: string,
  type?: string,
}

export const FormFieldInput = function({type='text',name, control, label, placeholder,formDescription}:PropsFormFieldInput){
    return  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
         {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
            <Input placeholder={placeholder}  type={type} {...field}/>
        </FormControl>
        <FormDescription>
           {formDescription}
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
  }