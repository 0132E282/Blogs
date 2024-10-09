import { Button, ButtonProps, buttonVariants, Card, CardContent, CardFooter, CardHeader,CardTitle } from "@/components/ui";
import { Check, Pen, Eye, Undo2, CircleX, Info, BadgeCheck, TriangleAlert, HeartOff} from "lucide-react";
import Link from "next/link";
import { ReactElement, useEffect, useRef, useState } from "react";

export type StatusMessageProps = {
    title : string,
    status: 'success' | 'error' | 'info' | 'warning',
    message: string,
    actions?: ButtonProps[],
    description?: string,
    onRedirect: ()=>void,
    hrefUpdate: string,
    hrefView: string,
};
const typeMessage = {
    success:{
        title: 'Action success',
        message: 'Your action was successful.',
        icon: Check,
        color: 'green',
        variant: 'success',
    },
    warning: {
        title: 'Action warning',
        message: 'Your action was warning.',
        icon: TriangleAlert,
        color: 'green',
        variant: 'success',
    },
    error: {
        title: 'Action error',
        message: 'Your action was error.',
        icon: CircleX,
        color: 'green',
        variant: 'success',
    },
    info: {
        title: 'Action info',
        message: 'Your action was info.',
        icon: Info,
        color: 'green',
        variant: 'success',
    },
    default: {
        title: 'Action success',
        message: 'Your action was successfully',
        icon: BadgeCheck,
        color: 'green',
        variant: 'success',
    },
  }
  
const StatusMessage = function ({title, status, message,description,onRedirect, hrefUpdate, hrefView}:StatusMessageProps){
    const {icon:Icon, color, message:messageDefault, title:titleDefault} = status ? typeMessage[status] : typeMessage['default'];
    const [timeRedirectURL, SetTimeRedirectUrl] =  useState(10);
    const buttonBack = useRef<HTMLButtonElement | null>(null);
    useEffect(()=>{
      const timeOutRedirectURL = timeRedirectURL > 0 && setTimeout(()=>SetTimeRedirectUrl(timeRedirectURL - 1),1000);
      if(timeRedirectURL <= 0 && buttonBack.current){
        buttonBack.current?.click();
      }
      return (()=>{
        if(timeOutRedirectURL){
           clearTimeout(timeOutRedirectURL);
        }
      }) 
    },[timeRedirectURL]);
    return <Card className="max-w-[520px] bg-white mx-auto mt-[5%]">
    <CardHeader className="flex flex-col">
            <span className="rounded-full border-8 mx-auto p-4 inline-block bg-green-500 border-green-100"> 
                <Icon size="40" className="text-white text-center"/> 
            </span>
          <CardTitle className="text-center fw-blod text-2xl !mt-4">{title ?? titleDefault}</CardTitle>
    </CardHeader>
    <CardContent className="text-center text-md">
            {message ?? messageDefault}
            {description}
    </CardContent>
    <CardFooter className="gird col-auto gap-4">
      <Button className="w-full" variant={'outline'} ref={buttonBack} onClick={onRedirect}>
         <Undo2 size={18} className="text-primary mr-2"/>
         Quại lại ({timeRedirectURL})
      </Button>
      <Link href={hrefUpdate} className={buttonVariants() + 'w-full'}> 
        <Pen size={18} className="text-primary text-white mr-2"/>
        Sửa lại
      </Link>
      <Link href={hrefView} className={buttonVariants() + 'w-full'}> 
        <Eye size={18} className="text-primary text-white mr-2"/>
        Xem chi tiết
      </Link>
    </CardFooter>
</Card>
}

export default StatusMessage;