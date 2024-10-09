"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui"
import {Form} from "@/components/ui/form"
import { FormFieldInput } from "@/components/ui/formFieldInput"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui"

const formSchema = z.object({
  email : z
  .string({ required_error: "Bạn phải nhập email",})
  .min(4, {
    message: "email phải có số ký tự lơn hơn 4 ký tự",
  }),
  password : z.string({ 
    required_error: "Bạn phải nhập password",
  })
  .min(4, {
    message: "mật khẩu phải có ích nhất 4 ký tự",
  }),
})
export type PropsAuthForm={
  onSubmit?: (values: z.infer<typeof formSchema>) => void;  // your form submit handler function
  defaultValues?: z.infer<typeof formSchema>;  // default values for form fields
  isLoading?: boolean
}
export default function AuthForm ({onSubmit = () => {}, isLoading = false }:PropsAuthForm ) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFieldInput name={'email'} control={form.control} label={'tài khoản email'} placeholder="nhập email của bạn" type="email"/>
        <FormFieldInput name={'password'} control={form.control} label={'password'} placeholder="nhập mật khẩu của bạn" type="password"/>
        <div className="flex items-center space-x-2 mt-3">
            <Checkbox id="terms" />
            <Label
              htmlFor="terms"
              className="cursor-pointer"
            >
              nhớ mật khẩu
            </Label>
        </div>
        <Button className="w-full mt-10" type="submit" disabled={isLoading}>Đăng nhập</Button>
      </form>
    </Form>
  )
}
