import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../Spinner";

const ListNotes = () => {
  const notesReport = useSelector((state) => state.noteReport);
  const { notes, error, loading } = notesReport;
  const [notify, setNotify] = useState("");

  useEffect(() => {
    if (error) {
      setNotify(toast.error(error));
    }
  }, [error]);
  return (
    <div className=" w-full h-60 overflow-y-auto flex flex-col flex-grow bg-gray-800 mr-3 mt-3 rounded-sm">
      {loading && <Spinner />}

      {notes?.data?.length != 0 ? (
        notes?.data?.map((x, i) => (
          <div
            key={i}
            className="border-2  border-gray-400  w-full mb-2 bg-gray-900 p-2">
            <h3 className=" ">المتابعة رقم[{i + 1}]</h3>
            <p>{x?.note}</p>
            <p className=" ">
              تاريخ المتابعة :{" "}
              {new Date(x?.createdAt)
                .toISOString()
                .replace(/T/, " ")
                .replace(/\..+/, "")}
            </p>
          </div>
        ))
      ) : (
        <div className="border-2  border-black  w-full mb-2">
          <h3 className="bg-black p-1">لا يوجد اي متابعات سابقة</h3>
        </div>
      )}

      <div>
        <p className="text-white">{notify}</p>
        <ToastContainer position="top-right" />
      </div>
    </div>
  );
};

export default ListNotes;
