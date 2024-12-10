import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../components/Common/getChartColorsArray";

const Spinearea = ({ dataColors, chart, data }) => {
    const spineareaChartColors = getChartColorsArray(dataColors);

    const series = [
        {
            name: "Commission",
            data: data.map(item => item.total_commissions),
        },
        {
            name: "Total Sales",
            data: data.map(item => item.total_sales),
        },
    ];

    const seriesOrder = [
        {
            name: "Number of Orders",
            data: data.map(item => item.total_orders),
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
            type: "category",
            categories: data.map(item => item.formatted_month),
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return chart != "NumberofOrders" ? ('£' + value.toFixed(2)) :  value.toFixed(0); // Formats the value to show £ and 2 decimal points
                },
            },
        },
        grid: {
            borderColor: "#f1f1f1",
        },
        tooltip: {
            x: {
                format: "MMM yyyy",
            },
        },
    }

    return (
        <ReactApexChart
            options={options}
            series={chart == "NumberofOrders" ? seriesOrder : series}
            type="area"
            height={chart == "NumberofOrders" ? "150" : "250"}
        />
    )
}

export default Spinearea;