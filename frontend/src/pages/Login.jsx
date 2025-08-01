import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const[currState,setCurrState] = useState('Login');
  const{token,setToken,navigate,backendUrl} = useContext(ShopContext)
  const[name,setName]= useState('');
  const[password,setPassword]= useState('');
  const[email,setEmail]= useState('');

  const submitHandler =async(e)=>{
    e.preventDefault();
    try {
      if(currState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register' ,{name,email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }else{
          toast.error(response.data.message);
        }
      }else{
        const response = await axios.post(backendUrl + '/api/user/login' , {email,password});
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token);
          console.log(token)
        }else{
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);   
      
    }
  }

  useEffect(()=>{
     if (token) {
    navigate('/');
   }
  },[token])

  return (
    <form onSubmit={submitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 '>
      <div className='inline-flex items-center gap-2 mb-4 mt-10'>
          <p className='prata-regular text-3xl'>{currState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
      </div>
      {
        currState=== "Login"? ''
        :<input type="text" onChange={(e)=>setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>
      }
      <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px] '>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currState === "Login"?
            <p onClick={()=>setCurrState('Sign Up')} className='cursor-pointer'>Create account</p>
          : <p onClick={()=>setCurrState('Login')} className='cursor-pointer'>Login here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currState === "Login" ? "Sign In" : "Sign Up"}</button>
    </form>
  )
}

export default Login
