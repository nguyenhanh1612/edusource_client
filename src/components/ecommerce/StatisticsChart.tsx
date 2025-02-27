"use client";
import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StatisticsChart() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Danh sách 12 tháng
  const months = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];

  // Lấy danh sách 4 tuần của một tháng
  const getWeeksInMonth = () => ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];

  // Lấy danh sách 7 ngày của một tuần
  const getDaysInWeek = (year: number, month: number, week: number) => {
    const startDay = (week - 1) * 7 + 1;
    return Array.from({ length: 7 }, (_, i) => `${year}-${month + 1}-${startDay + i}`);
  };

  // Data Thống Kê
  const yearlyData = {
    categories: months,
    series: [
      { name: "Doanh số", data: Array(12).fill(0).map(() => Math.floor(Math.random() * 200)) },
      { name: "Doanh thu", data: Array(12).fill(0).map(() => Math.floor(Math.random() * 100)) },
    ],
  };

  const monthlyData = selectedMonth !== null ? {
    categories: getWeeksInMonth(),
    series: [
      { name: "Doanh số", data: Array(4).fill(0).map(() => Math.floor(Math.random() * 100)) },
      { name: "Doanh thu", data: Array(4).fill(0).map(() => Math.floor(Math.random() * 50)) },
    ],
  } : null;

  const weeklyData = selectedWeek !== null && selectedMonth !== null ? {
    categories: getDaysInWeek(selectedYear, selectedMonth, selectedWeek),
    series: [
      { name: "Doanh số", data: Array(7).fill(0).map(() => Math.floor(Math.random() * 100)) },
      { name: "Doanh thu", data: Array(7).fill(0).map(() => Math.floor(Math.random() * 50)) },
    ],
  } : null;

  const dailyData = selectedDay !== null ? {
    categories: [selectedDay],
    series: [
      { name: "Doanh số", data: [Math.floor(Math.random() * 100)] },
      { name: "Doanh thu", data: [Math.floor(Math.random() * 50)] },
    ],
  } : null;

  const { categories, series } = dailyData || weeklyData || monthlyData || yearlyData;

  // Cấu hình Chart
  const options: ApexOptions = {
    chart: { height: 310, type: "area", toolbar: { show: false } },
    stroke: { curve: "smooth", width: [2, 2] },
    dataLabels: { enabled: false },
    colors: ["#465FFF", "#9CB9FF"],
    xaxis: {
      categories: categories,
      labels: {
        formatter: (value) => isNaN(Date.parse(value)) ? value : new Date(value).toLocaleDateString("vi-VN", { day: "numeric", month: "short" })
      },
    },
    yaxis: { labels: { style: { fontSize: "12px", colors: ["#6B7280"] } } },
    legend: { show: false },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Thống kê</h3>
          <p className="text-gray-500">Mục tiêu bạn đã đặt</p>
        </div>
        <div className="flex gap-3">
          {/* Select Năm */}
          <Select onValueChange={(value) => setSelectedYear(Number(value))}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={selectedYear} />
            </SelectTrigger>
            <SelectContent>
              {[2022, 2023, 2024].map((year) => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Select Tháng */}
          <Select onValueChange={(value) => setSelectedMonth(value === "all" ? null : Number(value))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Chọn tháng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {months.map((month, index) => (
                <SelectItem key={month} value={index.toString()}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Select Tuần */}
          {selectedMonth !== null && (
            <Select onValueChange={(value) => setSelectedWeek(value === "all" ? null : Number(value))}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Chọn tuần" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {[1, 2, 3, 4].map((week) => (
                  <SelectItem key={week} value={week.toString()}>Tuần {week}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Select Ngày */}
          {selectedWeek !== null && selectedMonth !== null && (
            <Select onValueChange={(value) => setSelectedDay(value === "all" ? null : value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Chọn ngày" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {getDaysInWeek(selectedYear, selectedMonth, selectedWeek).map((day) => (
                  <SelectItem key={day} value={day}>{day}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      <ReactApexChart options={options} series={series} type="area" height={310} />
    </div>
  );
}
