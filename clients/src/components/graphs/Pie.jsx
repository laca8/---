import PropTypes from "prop-types";
import React from "react";
import ReactApexChart from "react-apexcharts";

const Pie = ({ reports }) => {
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
  const [state, setState] = React.useState({
    series: result?.map((x) => x.count),
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5,
          },
        },
      },
      labels: result?.map((x) => x.city),
      dataLabels: {
        dropShadow: {
          blur: 3,
          opacity: 1,
        },
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div className="border-2">
      <div id="chart" style={{ padding: "2px" }}>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="pie"
          height={400}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
Pie.propTypes = {
  reports: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,
};

export default Pie;
