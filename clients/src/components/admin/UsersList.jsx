import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Spinner from '../Spinner'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const UsersList = () => {
const [notify,setNotify] = useState('')
const [users,setUsers] = useState([])
const API_URL = 'http://localhost:5000/api/user'
useEffect(()=>{
   const fetchData = async()=>{
    try {
        const res = await axios.get(API_URL)
        console.log(res);
        
        setUsers(res?.data?.data)
    } catch (error) {
        setNotify(toast.error(error?.response?.data?.message))
    }
   }
   fetchData()
},[notify])
const handleDelete = async(id)=>{
    try {
        const res = await axios.delete(`${API_URL}/${id}`)
        if(res?.data?.msg){
            setNotify(toast.success('تم حذف المستخدم'))
            
        }
    } catch (error) {
        setNotify(toast.error(error?.response?.data?.message))
        
    }
}
  return (
     <div className='container'>
        <div>
         <span className='text-white'>{notify}</span>
	    <ToastContainer position="top-right"/>
        </div>
        {
            users && users?.length > 0  ? (
                <div style={{height:'500px' ,overflowY:'auto'}}>
                <table className="w-full text-sm text-center text-white  mt-10 bg-blue-900 border-2 border-gray-800 shadow-lg ">
                <thead className="text-xs text-white uppercase  bg-gray-800 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            الاسم
                        </th>
                        <th scope="col" className="px-6 py-3">
                            is_Admin
                        </th>
                      <th scope="col" className="px-6 py-3 text-xl">
                             #
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-zinc-100 text-gray-700 '>
                    
                    {
                        users?.map((x,i)=>(
                            <tr key={i} className=" border-b-2 border-gray-950">
                        <th scope="row" className="p-2 font-medium  w-auto">
                            <p className='bg-gray-800 w-auto text-center p-2 rounded-md text-white'>
                        {x?.username}


                            </p>
                        </th>
                        <td className="p-2 w-auto">
                      {x?.isAdmin == 'true' ? <p className='w-8  m-auto text-xl bg-green-800 text-white  text-center '>✔</p> : <p className='w-8  m-auto  text-xl bg-red-800 text-white  items-center text-center '>X</p>}
                        </td>
                        <td className="p-2 w-auto">
                           
                            <button  className="font-medium text-white bg-red-900 p-1 m-1 hover:scale-95" onClick={()=>handleDelete(x?._id)}>حذف</button>
                        </td>
                    </tr>
                        ))
                    }
                    
                </tbody>
            </table>
            </div>
         
            ): (
                <Spinner/>
            )
        }


        
     </div>
  )
}

export default UsersList