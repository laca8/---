import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import SearchGraph from "../components/graphs/SearchGraph";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Line from "../components/graphs/Line";
import Bar from "../components/graphs/Bar";
import Pie from "../components/graphs/Pie";
const Graphs = () => {
  const [connName, setConnName] = useState("");
  const [phone, setPhone] = useState("");
  const [numReport, setNumReport] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [place, setPlace] = useState("");
  const [shiek, setShiek] = useState("");
  const reportDetail = useSelector((state) => state.report);
  const { error, loading, reports, success } = reportDetail;

  return (
    <div className=" py-4 px-12 ">
      <div>
        <SearchGraph
          numReport={numReport}
          setNumReport={setNumReport}
          city={city}
          setCity={setCity}
          place={place}
          setPlace={setPlace}
          shiek={shiek}
          setShiek={setShiek}
          name={name}
          setName={setName}
          connName={connName}
          setConnName={setConnName}
          phone={phone}
          setPhone={setPhone}
        />
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1 max-md:gap-2 max-sm:grid-cols-1 max-sm:2 text-black">
          <Pie reports={reports} />
          <Bar reports={reports} />
        </div>
      )}
    </div>
  );
};

export default Graphs;
