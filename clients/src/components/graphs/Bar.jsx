import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
const Bar = ({ reports }) => {
  const dublicate = {};
  reports?.data?.forEach(
    (x) => (dublicate[x.city] = dublicate[x.city] ? dublicate[x.city] + 1 : 1)
  );
  console.log(dublicate);
  const result = Object.keys(dublicate).map((x) => {
    return {
      city: x,
      count: dublicate[x],
    };
  });
  console.log(result);
  const [state, setState] = React.useState({
    series: [
      {
        name: "البلاغات",

        data: result?.map((x) => x.count),
      },
    ],
    options: {
      chart: {
        height: 400,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },

      plotOptions: {
        bar: {
          columnWidth: "50%",
          distributed: true,
          borderRadius: 3,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: result?.map((x) => x.city),

        labels: {
          rotate: -90,

          style: {
            colors: "#fff",
            fontSize: "14px",
            tickPlacement: "on",
          },
        },
      },

      title: {
        text: "أعداد البلاغات",
        align: "left",
        style: {
          fontSize: "14px",
          colors: "#000",
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
            fontSize: "14px",
          },
        },
      },

      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    },
  });

  return (
    <div className="border-2">
      <div id="chart" style={{ padding: "2px" }}>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={400}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
Bar.propTypes = {
  reports: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,
};

export default Bar;
