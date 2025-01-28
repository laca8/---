import React, { useState, useEffect } from "react";
import { fetchReports } from "../redux/slicers/reportSlice";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Search = ({
  numReport,
  setNumReport,
  name,
  setName,
  connName,
  setConnName,
  phone,
  setPhone,
  place,
  setPlace,
  shiek,
  setShiek,
  city,
  setCity,
}) => {
  const dispatch = useDispatch();
  const [notify, setNotify] = useState(null);
  useEffect(() => {
    const keywords = { connName, name, phone, numReport, shiek, city, place };
    console.log(keywords);
    dispatch(fetchReports(keywords));
  }, [connName, name, phone, numReport, dispatch, shiek, city, place]);

  const reportDetail = useSelector((state) => state.report);
  const { error, loading, report, success } = reportDetail;

  return (
    <div className=" mt-10 font-bold">
      <p className="font-bold text-center mb-4"> شاشة البحث</p>
      <div className="border-2 border-gray-400">
        <div className="grid grid-cols-4 justify-evenly max-md:grid-cols-2 max-md:gap-2  max-sm:grid-cols-1 max-sm:gap-2 text-right p-3">
          <div className="flex flex-col w-auto p-1">
            <label>اسم المتصل</label>
            <input
              className="bg-gray-800 p-1 w-full rounded-sm border-2 border-gray-400"
              value={connName}
              onChange={(e) => setConnName(e.target.value)}
              type="text"
              placeholder="ادخل اسم المتصل"
            />
          </div>
          <div className="flex flex-col  w-auto p-1">
            <label>رقم التليفون </label>
            <input
              className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="ادخل رقم التليفون"
            />
          </div>
          <div className="flex flex-col  w-auto p-1">
            <label>رقم البلاغ </label>
            <input
              className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400"
              value={numReport}
              onChange={(e) => setNumReport(e.target.value)}
              type="text"
              placeholder="ادخل رقم البلاغ"
            />
          </div>
          <div className="flex flex-col  w-auto p-1">
            <label>اسم الحالة</label>
            <input
              className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="ادخل اسم الحالة"
            />
          </div>
          <div className="flex flex-col  w-auto p-1">
            <label>المحافظة</label>
            <input
              className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="ادخل المحافظة"
            />
          </div>
          <div className="flex flex-col  w-auto p-1">
            <label>القسم</label>
            <input
              className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              type="text"
              placeholder="ادخل القسم/المركز"
            />
          </div>
          <div className="flex flex-col  w-auto p-1">
            <label>الشياخة</label>
            <input
              className="bg-gray-800 p-1 rounded-sm border-2 border-gray-400"
              value={shiek}
              onChange={(e) => setShiek(e.target.value)}
              type="text"
              placeholder="ادخل الشياخة"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start gap-3 mt-2"></div>
    </div>
  );
};

export default Search;
