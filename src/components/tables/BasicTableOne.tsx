'use client'
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import useGetAllOrders from "@/app/admin/transaction/hooks/useGetAllOrder";
import DateTimeDisplay from "../date";
import Pagination from "./Pagination";

export default function BasicTableOne() {
  const [selectedOrder, setSelectedOrder] = useState<API.Order | null>(null);
  const { isPending, getAllOrdersApi } = useGetAllOrders();
  const [orders, setOrders] = useState<API.Order[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(2);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    async function fetchOrders() {
      const res = await getAllOrdersApi({ pageIndex, pageSize });
      if (res) {
        setOrders(res.value.data.items);
        setTotalPages(res.value.data.totalPages);
        setTotalOrders(res.value.data.totalCount);
      }
    }
    fetchOrders();
  }, [pageIndex, pageSize]);

  const startIndex = (pageIndex - 1) * entriesPerPage + 1;
  const endIndex = Math.min(pageIndex * entriesPerPage, totalOrders);

  const openModal = (order: API.Order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-md dark:border-white/[0.1] dark:bg-gray-900">
      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400 text-sm">Hiển thị</span>
          <select
            className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:ring focus:ring-indigo-300"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setPageSize(Number(e.target.value));
              setPageIndex(1);
            }}
          >
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span className="text-gray-600 dark:text-gray-400 text-sm">mục</span>
        </div>
        <div className="relative w-80">
          <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
            <svg
              className="fill-gray-500 dark:fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                fill=""
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="border-b bg-gray-100 dark:bg-gray-800">
            <TableRow className="text-gray-600 dark:text-gray-300 text-sm font-semibold">
              {[
                "Kênh thanh toán",
                "Tiền đơn hàng",
                "Tiền thanh toán",
                "Ngày tạo",
                "Ngày thanh toán",
                "Mô tả",
                "Mã đơn hàng",
                "Chi tiết",
              ].map((header) => (
                <TableCell key={header} className="px-6 py-4 text-left">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <TableCell className="px-6 py-4 flex items-center gap-3">
                  <Image width={40} height={40} src="/images/logo1.png" alt="Edu Source" className="rounded-full" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">EduSource</span>
                </TableCell>

                <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {order.totalAmount.toLocaleString()} VND
                </TableCell>

                <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {order.paymentAmount.toLocaleString()} VND
                </TableCell>

                <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  <DateTimeDisplay dateTime={order.paidAt} />
                </TableCell>

                <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  <DateTimeDisplay dateTime={order.paidAt} />
                </TableCell>

                <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-300 truncate max-w-xs">
                  {order.description}
                </TableCell>

                <TableCell className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                  {order.orderCode}
                </TableCell>

                <TableCell className="px-6 py-4">
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition"
                    onClick={() => openModal(order)}
                  >
                    <span className="text-gray-600 dark:text-gray-300">...</span>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t bg-white dark:bg-gray-800 flex justify-between items-center">
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          Đang hiển thị {orders.length > 0 ? `${startIndex} - ${endIndex}` : "0"} trên tổng {orders.length} đơn hàng
        </span>
        <Pagination currentPage={pageIndex} totalPages={totalPages} onPageChange={setPageIndex} />
      </div>

      {selectedOrder && (
        <Dialog open={Boolean(selectedOrder)} onOpenChange={closeModal}>
          <DialogContent className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <DialogTitle className="border-b pb-4 text-lg font-semibold">Chi tiết đơn hàng</DialogTitle>
            <DialogDescription>
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <th className="py-2 px-4 border">Tên sản phẩm</th>
                    <th className="py-2 px-4 border">Đơn giá</th>
                    <th className="py-2 px-4 border">Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.orderDetails.map((detail) => (
                    <tr key={detail.id} className="text-gray-700 dark:text-gray-300">
                      <td className="py-2 px-4 border text-center">{detail.productName}</td>
                      <td className="py-2 px-4 border text-center">{detail.price.toLocaleString()} VND</td>
                      <td className="py-2 px-4 border text-center">{detail.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
