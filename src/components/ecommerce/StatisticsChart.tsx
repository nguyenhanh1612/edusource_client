"use client";
import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import ChartTab from "../common/ChartTab";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function StatisticsChart() {
  const [selected, setSelected] = useState<
    "optionOne" | "optionTwo" | "optionThree" | "optionFour"
  >("optionOne");

  // Hàm lấy ngày từ hôm nay
  const getDatesFromToday = (days: number) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    }
    return dates;
  };

  // Define data for each option
  const monthlyData = {
    categories: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    series: [
      {
        name: "Sales",
        data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
      },
      {
        name: "Revenue",
        data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
      },
    ],
  };

  const quarterlyData = {
    categories: ["Q1", "Q2", "Q3", "Q4"],
    series: [
      {
        name: "Sales",
        data: [540, 500, 600, 700],
      },
      {
        name: "Revenue",
        data: [120, 130, 150, 180],
      },
    ],
  };

  const annuallyData = {
    categories: ["2021", "2022", "2023"],
    series: [
      {
        name: "Sales",
        data: [2000, 2200, 2500],
      },
      {
        name: "Revenue",
        data: [500, 600, 700],
      },
    ],
  };

  const weeklyData = {
    categories: getDatesFromToday(7), // Lấy 7 ngày từ hôm nay
    series: [
      {
        name: "Sales",
        data: [50, 60, 55, 70, 65, 80, 75], // Dữ liệu doanh thu tương ứng
      },
      {
        name: "Revenue",
        data: [10, 15, 12, 20, 18, 25, 22], // Dữ liệu doanh thu tương ứng
      },
    ],
  };

  // Select data based on the selected option
  const { categories, series } =
    selected === "optionOne"
      ? monthlyData
      : selected === "optionTwo"
      ? quarterlyData
      : selected === "optionThree"
      ? annuallyData
      : weeklyData;

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        format: "dd MMM yyyy",
      },
    },
    xaxis: {
      type: "category",
      categories: categories, // Use dynamic categories
      labels: {
        formatter: function (value) {
          // Định dạng ngày nếu cần
          if (selected === "optionFour") {
            return new Date(value).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            });
          }
          return value;
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
      title: {
        text: "",
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Target you’ve set for each month
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab selected={selected} setSelected={setSelected} />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series} // Use dynamic series
            type="area"
            height={310}
          />
        </div>
      </div>
    </div>
  );
}