import React from "react"
import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "../../../components/Common/getChartColorsArray";

const Spinearea = ({ dataColors, chartData }) => {
    const spineareaChartColors = getChartColorsArray(dataColors);

    const seriesData = Object.values(chartData);

    const categories = Object.keys(chartData).map((day, index) => ({
        index: index + 1,
        formatted_day: day
    }));

    const series = [
        {
            name: "series1",
            data: seriesData,
        },
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
            categories: categories.map(item => item.formatted_day),
        },
        grid: {
            borderColor: "#f1f1f1",
        },
        tooltip: {
            x: {
                format: "dd/MM/yy",
            },
        },
    };

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="area"
            height="200"
        />
    );
};

export default Spinearea;