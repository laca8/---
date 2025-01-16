import React,{useEffect, useState} from 'react'
import {registerUser} from '../redux//slicers/authSlice'
import {useSelector,useDispatch}   from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner';
const Register = () => {
  const navigator = useNavigate()
  const  dispatch = useDispatch()
const [notify,setNotify] = useState('')
  const userDetails = useSelector((state)=>state.users)
  const {error,user,loading,success} =userDetails

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const API_URI = 'http://localhost:5000/api/user/register'
    const handleSubmit=async()=>{
      let config = {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          }
        }
      try{
        if(username == '' || password == ''){
          toast.error('الرجاء ادخال جميع البيانات')
        }
        if(username.length < 3){
          toast.error('الرجاء ادخال  اسم  يحتوي علي 3 احراف علي الاقل')
        }
        if(password.length < 6){
          toast.error('الرجاء ادخال  كلمة سر  تحتوي علي 6 احراف او 6 ارقام علي الاقل')
        }
         const res = await axios.post(API_URI,{username,password},config)
         console.log(res);
         
         if(res?.data?.data){
          setNotify(toast.success('تم اضافة حساب جديد'))

          setUsername('')
          setPassword('')
         }
         

      }catch(error){
        setNotify(toast.error(error))
          
      }

       
    }

    useEffect(()=>{
      if(error){
         setNotify(toast.error(error))      
    }
    },[error])
  return (
    <section className="text-white   flex flex-col  items-center mt-32 w-full m-auto">
  <div>
    <span className='text-white'>{notify}</span>
	    <ToastContainer position="top-right"/>
  </div>
             
            
              {
                loading ? <Spinner/> : (<>
          <div className=" font-bold p-5 max-md:w-80 max-sm:w-60 w-3/4 flex flex-col items-center ">

                 <h1 className="text-xl font-bold leading-tight  text-white bg-gray-950 p-2 w-1/2 rounded-md mb-5 text-center">
                اضافة حساب جديد
              </h1>
                 <div className='flex flex-col items-start w-1/2'>
                      <label  className="text-xl font-medium text-white mb-2">الاسم</label>
                      <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}  className='rounded-md bg-gray-800 w-full p-2 border-2 border-gray-400' placeholder="الاسم" required=""/>
                  </div>
                  <div className='flex flex-col items-start w-1/2'>
                      <label  className="text-xl font-medium text-white mb-2 ">الرقم السري</label>
                      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='rounded-md bg-gray-800  w-full p-2 border-2 border-gray-400'  placeholder="الرقم السري" />
                      
                    
                  </div>
                  <div className='mt-10'>
                  <button type="submit" className="w-full  bg-cyan-700 text-white  p-2 rounded-md mt-2 mb-2 " onClick={()=> handleSubmit()}>اضافة حساب </button>

                    </div>
                 
          </div>

                
                </>)
              }
             
             
                 
         
     
</section>
  )
}

export default Register