import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

const Form1 = () => {
const [notify,setNotify] = useState('')
 
  //console.log(dats)
  const navigator = useNavigate()
  const [nameUser,setNameUser] = useState('')
  const [communicationReport,setCommunicationReport] = useState('')
  const [connName,setConnName] = useState('')
  const [connPhone,setConnPhone] = useState('')
  const [connCity,setConnCity] = useState('')
  const [connPlace,setConnPlace] = useState('')
  const [connShiek,setConnShiek] = useState('')
  const [connJop,setConnJop] = useState('')
  const [connType,setConnType] = useState('')
  const [connRelation,setConnRelation] = useState('')
  const [connId,setConnId] = useState('')
  const [connAge,setConnAge] = useState('')
  const [side,setSide] = useState('')
  const stages = ['الصحة','التربية والتعليم','التضامن','المالية','التأمينات ']
  const usersDetails = useSelector((state)=> state.users)
  const {user} = usersDetails
const connectorData = JSON.parse(localStorage.getItem('connector'))
  useEffect(()=>{
setNameUser(user?.data?.username)
if(connectorData){
  setConnAge(connectorData?.connAge)
  setConnName(connectorData?.connName)
  setConnPhone(connectorData?.connPhone)
  setConnCity(connectorData?.connCity)
  setConnPlace(connectorData?.connPlace)
  setConnShiek(connectorData?.connShiek)
  setConnId(connectorData?.connId)
  setConnType(connectorData?.connType)
  setConnJop(connectorData?.connJop)
  setConnRelation(connectorData?.connRelation)
  setSide(connectorData?.side)
  setCommunicationReport(connectorData?.communicationReport)
}
  },[user])
  const handleSubmitReport = ()=>{
    const connector ={
      side,
      nameUser,
      communicationReport,
        connName,
        connCity,
        connId,
        connJop,
        connPhone,
        connPlace,
        connRelation,
        connType,
        connAge,
        connShiek
    }
    
    if(nameUser != ''& connName != ''& connCity != ''& side != ''& communicationReport != ''& connPlace !='' & connShiek !='' & connPhone != '' & connId != ''){
          localStorage.setItem('connector',JSON.stringify(connector))
    console.log(connector);  
    navigator('/report')
        }else {
          setNotify(toast.error('  استكمال جميع البيانات'))
        }
  }
  const handleSubmitSuggestion = ()=>{
    const connector ={
        connName,
        connCity,
        connId,
        connJop,
        connPhone,
        connPlace,
        connShiek,
        connRelation,
        connType,
        connAge,
        nameUser,
        side,
        communicationReport,
        


      }
      if( 
        nameUser != ''&
          connName != ''&
          connCity != ''&
          side != ''&
          connPhone !=''&
          communicationReport != ''&
          connPlace !='' &
          connShiek !='' ){
            localStorage.setItem('connector',JSON.stringify(connector))
      console.log(connector);  
      navigator('/suggestion')
          }else {
            setNotify(toast.error('  استكمال جميع البيانات'))
          }

  }
  const [data,setData] = useState([])
  const API_URI = 'http://localhost:5000/api/city'
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await axios.get(API_URI)
        setData(res?.data?.data)
        
      } catch (error) {
        setNotify(toast.error(error))
      }
    }
    fetchData()
  },[])

  return (
    <div className=' mt-20 font-bold'>
      
        <p className='font-bold text-right text-red-700 mb-1'>ملاحظة (1) الاسئلة ذات النجمة الحمراء  ملؤها <span className='text-red-700'>*</span></p>
        <p className='font-bold text-right bg-cyan-700 p-1 w-auto rounded-sm'> ملاحظة (2) الاسئلة ذات الخلفية الرمادية لا داعي لسؤالها </p>

        <div className='border-2 border-gray-400 p-5'> 
          <p className='bg-cyan-700 w-1/4 m-auto text-center p-2'>بيانات متلقي البلاغ </p>

         <div className='grid grid-cols-3 justify-evenly  max-sm:grid-cols-1  text-right p-1 w-full'>
         <div className='flex flex-col w-full p-1'>
         <label>متلقي البلاغ <span className='text-red-700'>*</span></label>
         <input disabled className='bg-gray-800 p-1 w-full rounded-sm border-2 border-gray-800'  type='text' placeholder='ادخل اسم متلقي البلاغ' value={nameUser} onChange={(e)=>setNameUser(e.target.value)} />
          </div>
          <div className='flex flex-col  w-auto p-1'>
          <label>وسيلة البلاغ <span className='text-red-700'>*</span></label>
          <select id="countries" className="bg-gray-800 p-1 rounded-sm w-full border-2 border-gray-400" value={communicationReport} onChange={(e)=>setCommunicationReport(e.target.value)}>
            <option value="" selected disabled hidden>اختر</option>
             
              <option >اتصال هاتفي</option>
              <option >ايميل</option>
              <option >بريد</option>
              <option >أخرى</option>
             
            </select>
          </div>
          <div className='flex flex-col  w-auto p-1'>
          <label>جهة البلاغ <span className='text-red-700'>*</span></label>

            <select id="countries" className="bg-gray-800 p-1 rounded-sm w-full border-2 border-gray-400" value={side} onChange={(e)=>setSide(e.target.value)}>
            <option value="" selected disabled hidden>اختر</option>

            {
                stages?.map((x,i)=>
                <option key={i}>{x}</option>
                )
              }
             
            </select>
          </div>
          
         
         </div>
        
        </div>

        <div className='border-2 border-gray-400 mt-2'> 

          <p className='bg-gray-800 p-1 text-center' >بيانات المتصل</p>

         <div className='grid grid-cols-4 justify-evenly  max-sm:grid-cols-1 text-right p-3'>
         <div className='flex flex-col w-auto p-1'>
            <label>الاسم<span className='text-red-700 '>*</span></label>
            <input className='bg-gray-800 p-1 w-full rounded-sm border-2 border-gray-400' value={connName} onChange={(e)=>setConnName(e.target.value)} type='text' placeholder='ادخل الاسم' />
          </div>
          <div className='flex flex-col  w-auto p-1'>
            <label>رقم التليفون <span className='text-red-700'>*</span></label>
            <input maxLength={'11'} className='bg-gray-800 p-1 rounded-sm border-2 border-gray-400' value={connPhone} onChange={(e)=>setConnPhone(e.target.value)} type='text' placeholder='ادخل رقم التليفون' />
          </div>
          <div className='flex flex-col w-auto p-1 '>
            <label>تاريخ الميلاد</label>
            <input className='bg-gray-800 p-1 rounded-sm border-2 border-gray-400' value={connAge} onChange={(e)=>setConnAge(e.target.value)} type='date' placeholder='ادخل السن ' />
          </div>
          <div className='flex flex-col w-auto bg-cyan-700 rounded-md p-1 '>
            <label>النوع</label>
            <select id="countries" className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400" value={connType} onChange={(e)=>setConnType(e.target.value)}  >
            <option value="" selected disabled hidden>اختر</option>
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
            </select>

          
          </div>
          <div className='flex flex-col  w-auto p-1'>
            <label>المحافظة <span className='text-red-700'>*</span></label>
           
            <select id="countries" className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400"value={connCity} onChange={(e)=>setConnCity(e.target.value)}  >
            <option value="" selected disabled hidden>اختر</option>
           
           {
            data &&data?.filter((v,i,a)=>a.findIndex(v2=>(v["city"] === v2["city"]))===i)?.map((x,i)=>(
              <option key={i}>{x['city']}</option>
            ))
           }
            </select>
          </div>
          <div className='flex flex-col  w-auto p-1'>
            <label>المركز/الحي<span className='text-red-700'>*</span></label>
            <select  disabled={!connCity} id="countries" className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400" placeholder='ادخل المركز/الحي' value={connPlace} onChange={(e)=>setConnPlace(e.target.value)}  >
            <option value="" selected disabled hidden>اختر</option>
          
           {
           connCity && data&&data.filter((x,i)=> x['city']  == connCity)?.map((y,i)=>(
              <option key={i}>{y['place']}</option>
            
            
            ))
           }
            </select>
        
          </div>
          <div className='flex flex-col  w-auto p-1'>
            <label>القرية/الشياخة<span className='text-red-700'>*</span></label>
            <select  disabled={!connPlace} id="countries" className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400" placeholder='ادخل القرية/الشياخة' value={connShiek} onChange={(e)=>setConnShiek(e.target.value)}  >
            <option value="" selected disabled hidden>اختر</option>
         
           {
          connPlace && data && data?.filter((x,i)=> x['place']  == connPlace )?.map((x,i)=>(
              x['shiek'].map((y,i)=>(
                <option key={i}>{y}</option>
              )
            
          )))
            }
            </select>
        
          </div>
          <div className='flex flex-col w-auto p-1'>
            <label>الوظيفة</label>
            <input className='bg-gray-800 p-1 rounded-sm border-2 border-gray-400' type='text' value={connJop} onChange={(e)=>setConnJop(e.target.value)} placeholder='ادخل الوظيفة' />
          </div>
         
          <div className='flex flex-col w-auto p-1 '>
            <label>درجة القرابة</label>
            <input className='bg-gray-800 p-1 rounded-sm border-2 border-gray-400' value={connRelation} onChange={(e)=>setConnRelation(e.target.value)} type='text' placeholder='ادخل درجة القرابة' />
          </div>
          <div className='flex flex-col w-auto p-1'>
            <label>الرقم القومي</label>
            <input maxLength={'14'} className='bg-gray-800 p-1 rounded-sm border-2 border-gray-400' value={connId} onChange={(e)=>setConnId(e.target.value)} type='text' placeholder='ادخل الرقم القومي' />
          </div>
         
         </div>
        </div>
      <div className='flex flex-row items-start gap-3 mt-2'>
        <button className='bg-yellow-600 p-1 rounded-sm text-white' onClick={()=>handleSubmitReport()}>بلاغات</button>
        <button className='bg-blue-950 p-1 rounded-sm text-white' onClick={()=>handleSubmitSuggestion()}>استعلامات </button>
      </div>
      <div>
    <span className='invisible'>{notify}</span>
	    <ToastContainer position="top-right"/>
  </div>
    </div>
  )
}

export default Form1