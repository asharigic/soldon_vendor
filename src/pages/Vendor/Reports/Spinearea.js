import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../components/Common/getChartColorsArray";

const Spinearea = ({ dataColors, chart }) => {
    const spineareaChartColors = getChartColorsArray(dataColors);

    const series = [
        {
            name: "Commission",
            data: [34, 40, 28, 52, 42, 109, 100],
        },
        {
            name: "Total Sales",
            data: [32, 60, 34, 46, 34, 52, 41],
        },
    ];

    const seriesOrder = [
        {
            name: "Number of Orders",
            data: [34, 40, 28, 52, 42, 109, 100],
        }
    ];

    const options = {
        chart: {
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 3,
        },

        colors: spineareaChartColors,
        xaxis: {
            type: "datetime",
            categories: [
                "2018-09-19T00:00:00",
                "2018-09-19T01:30:00",
                "2018-09-19T02:30:00",
                "2018-09-19T03:30:00",
                "2018-09-19T04:30:00",
                "2018-09-19T05:30:00",
                "2018-09-19T06:30:00",
            ],
        },
        grid: {
            borderColor: "#f1f1f1",
        },
        tooltip: {
            x: {
                format: "dd/MM/yy HH:mm",
            },
        },
    }
    console.log("chart", chart);

    return (
        <ReactApexChart
            options={options}
            series={chart == "NumberofOrders" ? seriesOrder : series}
            type="area"
            height={chart == "NumberofOrders" ? "120" : "250"}
        />
    )
}

export default Spinearea;