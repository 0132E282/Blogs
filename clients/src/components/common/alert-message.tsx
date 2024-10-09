import { AlertDialog, AlertDialogContent, AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle, AlertDialogCancel, AlertDialogAction} from "@/components/ui/alert-dialog"
import { Check,TriangleAlert,CircleX, Info, BadgeCheck} from "lucide-react";
import {AlertDialogActionProps, type AlertDialogProps } from '@radix-ui/react-alert-dialog';


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

export type typeAlertMessage ={
  title?: string;
  message?: string;
  type?: 'success' | 'warning' | 'error' | 'default' | undefined;
  actions: AlertDialogActionProps[];
} & AlertDialogProps;
const AlertMessage = function({title, message, type, actions , ...options}:typeAlertMessage){
    const {icon:Icon, color, message:messageDefault, title:titleDefault} = type ? typeMessage[type] : typeMessage['default']; 
    return(<AlertDialog {...options}>
      <AlertDialogContent>
      <AlertDialogHeader className="justify-center item-center">
          <span className={`rounded-full border-8 mx-auto p-4 inline-block bg-${color}-500 border-${color}-100`}> 
                <Icon size="40" className="text-white text-center"/> 
          </span>
          <AlertDialogTitle className="text-center text-xl">
              {title ?? titleDefault}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-center text-md">
            { message != '' ? message : messageDefault}
        </AlertDialogDescription>
        <AlertDialogFooter className="pb-3 !justify-center pt-7">
            {actions.map((action: AlertDialogActionProps, index: number) => {
              return <AlertDialogAction className={`flex-1 ${action.className}` } key={index} {...action}>
                {action.title ?? ''}
              </AlertDialogAction>
            })}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>)
}


export default AlertMessage;