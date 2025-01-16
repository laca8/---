import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {fetchSugg} from '../redux/slicers/suggSlice'
import { useSelector,useDispatch } from 'react-redux'
import UpdateSugg from '../components/suggList/UpdateSugg'
const ShowSugg = () => {
  const dispatch = useDispatch()
  let { id } = useParams();
  const suggDetails = useSelector((state)=>state.suggestion)
  const {error,loading,sugg,suggs} = suggDetails
  useEffect(()=>{
    console.log(sugg);
    if(!sugg?.data?.connName || sugg?.data?._id != id){
        dispatch(fetchSugg(id))
    }
  },[id])
  return (
    <div className='container mt-10 font-bold text-center'>
     
        <UpdateSugg/>
    </div>
  )
}

export default ShowSugg