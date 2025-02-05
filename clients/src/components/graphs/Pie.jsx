import PropTypes from "prop-types";
import React from "react";
import ReactApexChart from "react-apexcharts";

const Pie = ({ reports }) => {
  const dublicate = {};

  const results = reports?.data?.map((x, i) => {
    const data = reports?.data?.filter(
      (y, index) => x.city == y.city && x.imp == y.imp
    );
    return {
      city: data[0]?.city,
      imp: data[0]?.imp,
      count: data.length,
    };
  });
  // reports?.data?.forEach(
  //   (x) => (dublicate[x.city] = dublicate[x.city] ? dublicate[x.city] + 1 : 1)
  // );
  // console.log(dublicate);
  // const result = Object.keys(dublicate).map((x) => {
  //   return {
  //     city: x,
  //     count: dublicate[x],
  //   };
  // });
  const [state, setState] = React.useState({
    series: results
      ?.filter(
        (obj, index, self) =>
          index ===
          self.findIndex(
            (t) => t["city"] === obj["city"] && t["imp"] === obj["imp"]
          )
      )

      ?.map((x) => x.count),
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
      labels: results
        ?.filter(
          (obj, index, self) =>
            index ===
            self.findIndex(
              (t) => t["city"] === obj["city"] && t["imp"] === obj["imp"]
            )
        )
        ?.map(
          (x) =>
            `${x.city} ${x.imp ? "=> (تم تنفيذها)" : "=> (لم يتم تنفيذها)"}`
        ),

      legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: "right",
        horizontalAlign: "center",
        fontSize: "18px",
        fontFamily: "Helvetica, Arial",
        fontWeight: 400,
        color: "red",
        itemMargin: {
          horizontal: 15,
          vertical: 0,
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
