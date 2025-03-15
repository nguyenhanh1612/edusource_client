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
import { FilterSortType } from "@/const/order";

export default function BasicTableOne() {
  const [selectedOrder, setSelectedOrder] = useState<API.Order | null>(null);
  const { isPending, getAllOrdersApi } = useGetAllOrders();
  const [orders, setOrders] = useState<API.Order[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(2);
  const [totalOrders, setTotalOrders] = useState(0);
  const [SortType, setSortType] = useState<FilterSortType>(FilterSortType.TotalAmount);
  const [IsSortASC, setIsSortASC] = useState<boolean>(true);

  useEffect(() => {
    async function fetchOrders() {
      const res = await getAllOrdersApi({ SortType, IsSortASC, pageIndex, pageSize });
      if (res) {
        setOrders(res.value.data.items);
        setTotalPages(res.value.data.totalPages);
        setTotalOrders(res.value.data.totalCount);
      }
    }
    fetchOrders();
  }, [SortType, IsSortASC, pageIndex, pageSize]);

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

        <button
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 transition"
          onClick={() => {
            setSortType((prev) => {
              if (prev === FilterSortType.TotalAmount) {
                return FilterSortType.PaidDate;
              } else {
                return FilterSortType.TotalAmount;
              }
            });
            setIsSortASC((prev) => !prev);
          }}
        >
          <svg className="w-5 h-5 stroke-current" viewBox="0 0 20 20" fill="none">
            <path d="M2.29 5.9h15.42M17.71 14.1H2.29" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12.08" cy="5.9" r="2.57" strokeWidth="1.5" />
            <circle cx="7.92" cy="14.1" r="2.57" strokeWidth="1.5" />
          </svg>
          Lọc theo: {SortType === FilterSortType.TotalAmount ? "Tổng tiền" : "Ngày thanh toán"}{" "}
          {IsSortASC ? "⬆️" : "⬇️"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="border-b bg-gray-100 dark:bg-gray-800">
            <TableRow className="text-gray-600 dark:text-gray-300 text-sm font-semibold">
              {[
                "Kênh thanh toán",
                "Tiền đơn hàng",
                "Tiền thanh toán",
                "Ngày thanh toán",
                "Mô tả",
                "Số tài khoản",
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

                <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-300 truncate max-w-xs">
                  {order.description}
                </TableCell>

                <TableCell className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#006B68] flex items-center justify-center">
                    <Image
                      width={40}
                      height={40}
                      src="/images/bidv.png"
                      alt="BIDV Logo"
                      className="w-auto h-full object-contain"
                    />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">6150591310</span>
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
              <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800">
                <h3 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200 text-center">Thông tin khách hàng</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Họ và Tên:</strong> {`${selectedOrder.account.firstName} ${selectedOrder.account.lastName}`}
                </p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {selectedOrder.account.email}</p>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <th className="py-2 px-4">Tên sản phẩm</th>
                    <th className="py-2 px-4">Đơn giá</th>
                    <th className="py-2 px-4">Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.orderDetails.map((detail) => (
                    <tr key={detail.id} className="text-gray-700 dark:text-gray-300">
                      <td className="py-2 px-4 text-center">{detail.productName}</td>
                      <td className="py-2 px-4 text-center">{detail.price.toLocaleString()} VND</td>
                      <td className="py-2 px-4 text-center">{detail.quantity}</td>
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
