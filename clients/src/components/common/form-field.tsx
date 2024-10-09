import { FormControl, FormDescription, FormField as FormFieldShadcn, FormItem, FormLabel, FormMessage } from "@/components/ui"
import { PropsComponents } from "@/models";
import React, { ChangeEvent, ChangeEventHandler } from "react";

type FormFieldProps = PropsComponents & {
    form : any,
    name: string,
    label?: string,
    description?: string,
    render: (props: any) => React.ReactNode,
}

const FormField = function({form,name,label,description, className, render }:FormFieldProps){
    return <FormFieldShadcn control={form.control} name={name}  render={(Props) =>(
        <FormItem className={className}>
             {label && <FormLabel>{label}</FormLabel>} 
            <FormControl>
                {render(Props) ?? ''}
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>} 
            <FormMessage />
        </FormItem>
    )} />
}
export default FormField;