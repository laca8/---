import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchReports } from "../../redux/slicers/reportSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner";
import { ToastContainer, toast } from "react-toastify";

const ListsReports = () => {
  const navigator = useNavigate();

  const clickToShow = (id) => {
    navigator(`/show-report/${id}`);
  };
  const report = useSelector((state) => state.report);

  const { error, loading, reports } = report;
  const [notify, setNotify] = useState("");

  useEffect(() => {
    if (error) {
      setNotify(toast.error(error));
    }
  }, [error]);
  return (
    <div className="w-full   flex flex-col flex-grow shadow-md sm:rounded-lg font-bold ">
      {loading && <Spinner />}
      <div>
        <p className="text-white">{notify}</p>
        <ToastContainer position="top-right" />
      </div>
      {reports?.data?.length == 0 ? (
        <p className="bg-gray-800 text-right p-1 text-white rounded-sm mt-2 mb-2">
          لا يوجد بيانات تتماشي مع عملية البحث حاول مرة أخرى
        </p>
      ) : (
        <table className="w-full text-sm text-center text-gray-500  mt-10  border-2 border-gray-800 shadow-lg  ">
          <thead className="text-xs text-white   bg-gray-800 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                رقم البلاغ
              </th>
              <th scope="col" className="px-6 py-3">
                الاعاقة
              </th>
              <th scope="col" className="px-6 py-3">
                اسم المتصل
              </th>
              <th scope="col" className="px-6 py-3">
                اسم متلقي البلاغ
              </th>
              <th scope="col" className="px-6 py-3">
                المحافظة
              </th>
              <th scope="col" className="px-6 py-3">
                المركز
              </th>
              <th scope="col" className="px-6 py-3">
                الشياخة
              </th>
              <th scope="col" className="px-6 py-3 text-xl">
                تم التنفيذ
              </th>
              <th scope="col" className="px-6 py-3 text-xl">
                التاريخ
              </th>
              <th scope="col" className="px-6 py-3 text-xl">
                #
              </th>
            </tr>
          </thead>
          <tbody className="bg-zinc-100 text-gray-700 w-full ">
            {reports?.data?.map((x, i) => (
              <tr key={i} className="border-b-2 border-gray-950">
                <td scope="row" className="p-2 font-medium  w-auto">
                  <p className="bg-gray-800 w-auto text-center p-2 rounded-md text-white">
                    {x?.numReport}
                  </p>
                </td>
                <td scope="row" className="p-2 font-medium  w-auto">
                  <p className="bg-gray-800 w-auto text-center p-2 rounded-md text-white">
                    {x?.dis}
                  </p>
                </td>
                <td scope="row" className="p-2 font-medium  w-auto">
                  <p className="bg-gray-800 w-auto text-center p-2 rounded-md text-white">
                    {x?.connName}
                  </p>
                </td>
                <td scope="row" className="p-2 font-medium  w-auto">
                  <p className="bg-gray-800 w-auto text-center p-2 rounded-md text-white">
                    {x?.nameUser}
                  </p>
                </td>
                <td scope="row" className="p-2 font-medium  w-auto">
                  <p className="bg-gray-800 w-auto text-center p-2 rounded-md text-white">
                    {x?.city}
                  </p>
                </td>
                <td scope="row" className="p-2 font-medium  w-auto">
                  <p className="bg-gray-800 w-auto text-center p-2 rounded-md text-white">
                    {x?.place}
                  </p>
                </td>
                <td scope="row" className="p-2 font-medium  w-auto">
                  <p className="bg-gray-800 w-auto text-center p-2 rounded-md text-white">
                    {x?.shiek}
                  </p>
                </td>
                <td className="p-2 w-auto">
                  {x?.imp == true ? (
                    <p className="w-8  m-auto text-xl bg-green-800 text-white  text-center ">
                      ✔
                    </p>
                  ) : (
                    <p className="w-8  m-auto  text-xl bg-red-800 text-white  items-center text-center ">
                      X
                    </p>
                  )}
                </td>
                <td scope="row" className="p-2 font-medium  w-auto">
                  <p className="bg-gray-800 w-auto text-center p-2 rounded-md text-white">
                    {x?.createdAt?.replace(/T/, " ")?.replace(/\..+/, "")}
                  </p>
                </td>
                <td scope="row" className="p-2 font-medium  w-auto">
                  <button
                    className="bg-yellow-600 p-2 rounded-md shadow-md text-white"
                    onClick={() => clickToShow(x?._id)}>
                    عرض
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListsReports;
