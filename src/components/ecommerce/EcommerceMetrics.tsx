"use client";
import React, { useEffect, useState } from "react";
import Badge from "@/components/ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons/index";
import useGetDashboard from "@/app/admin/dashboard/hooks/useGetStatistics";

export const EcommerceMetrics = () => {
  const { isPending, getDashboardApi } = useGetDashboard();
  const [metrics, setMetrics] = useState({
    customers: 0,
    orders: 0,
    customerGrowth: 0,
    orderGrowth: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const currentYear = new Date().getFullYear();
      try {
        const res = await getDashboardApi({ year: currentYear });
        if (res?.value?.data) {
          const { customersCount, ordersCount } = res.value.data;
          setMetrics({
            customers: customersCount,
            orders: ordersCount,
            customerGrowth: 11.01, 
            orderGrowth: -9.05,
          });
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Customers Metric */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Customers</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {isPending ? "Loading..." : metrics.customers.toLocaleString()}
            </h4>
          </div>
          <Badge color={metrics.customerGrowth >= 0 ? "success" : "error"}>
            {metrics.customerGrowth >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {Math.abs(metrics.customerGrowth)}%
          </Badge>
        </div>
      </div>

      {/* Orders Metric */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Orders</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {isPending ? "Loading..." : metrics.orders.toLocaleString()}
            </h4>
          </div>
          <Badge color={metrics.orderGrowth >= 0 ? "success" : "error"}>
            {metrics.orderGrowth >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {Math.abs(metrics.orderGrowth)}%
          </Badge>
        </div>
      </div>
    </div>
  );
};
