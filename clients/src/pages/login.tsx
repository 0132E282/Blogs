import AuthForm from '@/components/auth/formAuth';
import { Card } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import {useAuth} from '@/hook';
import { ToastAction } from '@radix-ui/react-toast';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Login = () => {
  const {login} = useAuth();
  const route = useRouter();
  const [isLoading,setIsLoading] = useState(false);
  const [message,setMessage] = useState<string>('');
  const handleSubmitLogin = async (values) => {
    setIsLoading(true);
    try {
       await login({
          password : values.password,
          email : values.email
        });
        setMessage("");
        route.push('/admin');
    }catch (error: unknown) {
      const {message} = error;
      setMessage(message);
    }
    setIsLoading(false);
  }
  return (
    <div className='min-w-[100vw] min-h-[100vh] '>
        <Card className="max-w-[500px]  pt-4 py-10 px-8 mt-[10%] mx-auto"> 
            <h1 className='text-center font-bold mb-2 text-xl'>Đăng nhập</h1>
           {message &&  <p className="my-3 text-bold text-red-500 text-center">{message}</p>}
            <AuthForm onSubmit={handleSubmitLogin} isLoading={isLoading} />
        </Card>
    </div>
  )
}
export default Login