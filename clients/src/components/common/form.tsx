"use client"
import { UseFormReturn } from '@/models';
import { ReactNode, FC} from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import {Form as FormUiShad} from '@/components/ui/form';
type FormProps<T extends FieldValues> = {
  children: ReactNode,
  onSubmit:SubmitHandler<T>,
  form: UseFormReturn<T>,
  className?: string
}


const Form =<T extends FieldValues,>({children, onSubmit, form, className, ...props}: FormProps<T>) =>{
    return <FormUiShad {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)} {...props}>{children}</form>
    </FormUiShad>
}
export default Form;