import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';

const LevelWork = () => {
const [notify,setNotify] = useState('')
const [title,setTitle] = useState('')
const [data,setData] = useState([])
    const API_URL = 'http://localhost:5000/api/eduLevel' 

    const handleAdd = async()=>{
       if(title == ''){
        setNotify(toast.error('الرجاء عليك استكمال جميع البيانات'))

       }else{
        const res = await axios.post(API_URL,{title})
       // window.location.reload()
        console.log(res)
  
        setNotify(toast.success('تم اضافة البيانات'))
        setTitle('')

       }
    }
    useEffect(()=>{
     const fetchData = async()=>{
         const res = await axios.get(API_URL)
         setData(res?.data?.data)
     }
     fetchData()
    },[title,notify])
    const handleDelete = async(id)=>{
        try {
        const res = await axios.delete(`${API_URL}/${id}`)
        if(res?.data){
            setNotify(toast.success('تم حذف البيانات'))
            setTitle(null)
        }
            
        } catch (error) {
        setNotify(toast.error(error?.response?.data?.message))
            
        }
    }

  return (
    <div className=' container flex flex-col items-center justify-center content-center w-1/2  p-5   '>
         <div>
    <span className='text-white'>{notify}</span>
	    <ToastContainer position="top-right"/>
  </div>
        <h1 className='p-2 bg-gray-950 rounded-md w-1/2 text-white font-bold mb-2 mt-32'>المستوي التعليمي</h1>
        <div className='flex flex-row w-1/2 '>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type='text' placeholder='اضافة حالة تعليمية جديدة' className='border-2 bg-gray-800 p-2 w-full'/>
            <button className='bg-cyan-700 p-1 text-white' onClick={()=>handleAdd()}>اضافة</button>
        </div>
        <div className='w-1/2 h-80 overflow-y-auto'>

       
        {
     data ?       data?.map((x,i)=>(
                <div key={i} className='p-1 flex flex-row justify-between w-full rounded-md bg-black text-white mt-2'>
                    <span>{x.title}</span>
                    <button className='p-1 bg-red-500' onClick={()=>handleDelete(x?._id)}>حذف</button>
                </div>
            ))
        : <p>loading...</p>
        }

</div>
    </div>
  )
}

export default LevelWork