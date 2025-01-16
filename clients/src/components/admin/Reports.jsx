import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Spinner from '../Spinner'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {fetchReports} from '../../redux/slicers/reportSlice'
const Reports = () => {
const dispatch = useDispatch()
const report = useSelector((state)=> state.report)
const {error,loading,reports} = report
const [notify,setNotify] = useState('')
useEffect(()=>{
    const keywords = {
        connName:'',
        name:'',
        numReport:'',
        phone:''
    }
    dispatch(fetchReports(keywords))
    console.log(reports);
    
},[])
  return (
    <div className='container'>
   
    {
        loading && <Spinner/>
    }
    {
        error &&  <div>
        <span className='text-white'>{error}</span>
       <ToastContainer position="top-right"/>
       </div>
    }
    {
        reports && reports?.data?.length > 0  && (
<div style={{height:'500px' ,overflowY:'auto'}}>
            <table className="w-full text-sm text-center text-gray-500  mt-10  border-2 border-gray-800 shadow-lg " >
            <thead className="text-xs text-white uppercase  bg-gray-800 ">
                <tr>
                    <th scope="col" className="px-6 py-3">
                   رقم البلاغ
                    </th>
                    <th scope="col" className="px-6 py-3">
                     اسم متلقي البلاغ
                    </th>
                  <th scope="col" className="px-6 py-3 text-xl">
                    تم التنفيذ
                    </th>
                    <th scope="col" className="px-6 py-3 text-xl">
                     التاريخ
                    </th>
                </tr>
            </thead>
            <tbody className='bg-zinc-100 text-gray-700 w-full ' style={{height:'500px' ,overflowX:'auto'}}>
                
                {
                    reports?.data?.map((x,i)=>(
                        <tr key={i} className=" border-b-2 border-gray-950">
                    <td scope="row" className="p-2 font-medium  w-auto">
                        <p className='bg-gray-800 w-auto text-center p-2 rounded-md text-white'>
                    {x?.numReport}


                        </p>
                    </td>
                    <td scope="row" className="p-2 font-medium  w-auto">
                        <p className='bg-gray-800 w-auto text-center p-2 rounded-md text-white'>
                    {x?.nameUser}


                        </p>
                    </td>
                    <td className="p-2 w-auto">
                  {x?.imp == true ? <p className='w-8  m-auto text-xl bg-green-800 text-white  text-center '>✔</p> : <p className='w-8  m-auto  text-xl bg-red-800 text-white  items-center text-center '>X</p>}
                    </td>
                    <td scope="row" className="p-2 font-medium  w-auto">
                        <p className='bg-gray-800 w-auto text-center p-2 rounded-md text-white'>
                        { new Date(x?.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')}


                        </p>
                    </td>
                   
                </tr>
                    ))
                }
                
            </tbody>
        </table>
        </div>

     
        )
    }


    
 </div>
  )
}

export default Reports