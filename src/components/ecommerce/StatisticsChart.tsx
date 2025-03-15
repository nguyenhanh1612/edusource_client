'use client'
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useGetDashboard from "@/app/admin/dashboard/hooks/useGetStatistics";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StatisticsChart() {
  const { isPending, getDashboardApi } = useGetDashboard();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ categories: string[]; series: any[] }>({
    categories: [],
    series: [],
  });

  const monthMapping: Record<string, string> = {
    January: "Tháng 1", February: "Tháng 2", March: "Tháng 3", April: "Tháng 4",
    May: "Tháng 5", June: "Tháng 6", July: "Tháng 7", August: "Tháng 8",
    September: "Tháng 9", October: "Tháng 10", November: "Tháng 11", December: "Tháng 12"
  };

  const weekMapping: Record<string, string> = {
    "Week 1": "Tuần 1", "Week 2": "Tuần 2", "Week 3": "Tuần 3", "Week 4": "Tuần 4"
  };

  useEffect(() => {
    const fetchData = async () => {
      const params: any = { year: selectedYear };

      if (selectedMonth !== null) params.month = selectedMonth + 1;
      if (selectedWeek !== null) params.week = selectedWeek;

      const res = await getDashboardApi(params);
      if (res?.value?.data) {
        const { data } = res.value.data;

        setChartData({
          categories: data.map((item) => monthMapping[item.name] || weekMapping[item.name] || item.name),
          series: [
            { name: "Sales", data: data.map((item) => item.sales) },
            { name: "Revenue", data: data.map((item) => item.revenue) },
          ],
        });
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth, selectedWeek]);

  const options: ApexOptions = {
    chart: { height: 310, type: "area", toolbar: { show: false } },
    stroke: { curve: "smooth", width: [2, 2] },
    dataLabels: { enabled: false },
    colors: ["#465FFF", "#9CB9FF"],
    xaxis: { categories: chartData.categories },
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
          <Select onValueChange={(value) => setSelectedYear(Number(value))}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={selectedYear} />
            </SelectTrigger>
            <SelectContent>
              {[2022, 2023, 2024, 2025].map((year) => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedMonth(value === "all" ? null : Number(value))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Chọn tháng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`).map((month, index) => (
                <SelectItem key={month} value={index.toString()}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>

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
        </div>
      </div>

      {isPending ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <ReactApexChart options={options} series={chartData.series} type="area" height={310} />
      )}
    </div>
  );
}
