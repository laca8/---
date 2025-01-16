import React, { useEffect, useState } from "react";
import UpdateReport from "../components/forms/UpdateReport";
import { useParams } from "react-router-dom";
import { fetchReport } from "../redux/slicers/reportSlice";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../components/Spinner";
const ShowReport = () => {
  const [notify, setNotify] = useState("");

  const dispatch = useDispatch();
  let { id } = useParams();
  const reportDetail = useSelector((state) => state.report);
  const { error, loading, report } = reportDetail;
  useEffect(() => {
    console.log(report);

    if (!report?.data?.connName || report?.data?._id != id) {
      dispatch(fetchReport(id));
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      setNotify(toast.error(error));
    }
  }, [error]);
  return (
    <div className="container">
      {loading && <Spinner />}

      <div>
        <p className="text-white">{notify}</p>
        <ToastContainer position="top-right" />
      </div>

      <UpdateReport id={id} />
    </div>
  );
};

export default ShowReport;
