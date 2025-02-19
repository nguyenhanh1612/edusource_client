'use client'
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";

interface Order {
  id: number;
  eduSource: string;
  orderAmount: string;
  paymentAmount: string;
  createdAt: string;
  paidAt: string;
  description: string;
  accountNumber: string;
  bankCode: string;
  details: string;
}


// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    eduSource: "/images/logo1.png",
    orderAmount: "3.900.000đ",
    paymentAmount: "3.900.000đ",
    createdAt: "2024-02-10",
    paidAt: "2024-02-11",
    description: "Thanh toán khóa học ReactJS",
    accountNumber: "123456789",
    bankCode: "VCB",
    details: "Giao dịch thành công",
  },
  {
    id: 2,
    eduSource: "/images/logo1.png",
    orderAmount: "2.500.000đ",
    paymentAmount: "2.500.000đ",
    createdAt: "2024-02-12",
    paidAt: "2024-02-13",
    description: "Thanh toán khóa học NextJS",
    accountNumber: "987654321",
    bankCode: "PP",
    details: "Giao dịch thành công",
  },
  {
    id: 3,
    eduSource: "/images/logo1.png",
    orderAmount: "1.200.000đ",
    paymentAmount: "1.200.000đ",
    createdAt: "2024-02-14",
    paidAt: "2024-02-14",
    description: "Thanh toán khóa học UI/UX",
    accountNumber: "012345678",
    bankCode: "MOMO",
    details: "Giao dịch thành công",
  },
  {
    id: 4,
    eduSource: "/images/logo1.png",
    orderAmount: "5.000.000đ",
    paymentAmount: "5.000.000đ",
    createdAt: "2024-02-15",
    paidAt: "2024-02-16",
    description: "Thanh toán khóa học Laravel",
    accountNumber: "654321987",
    bankCode: "ACB",
    details: "Giao dịch thành công",
  },
  {
    id: 5,
    eduSource: "/images/logo1.png",
    orderAmount: "4.500.000đ",
    paymentAmount: "4.500.000đ",
    createdAt: "2024-02-17",
    paidAt: "2024-02-18",
    description: "Thanh toán khóa học VueJS",
    accountNumber: "789123456",
    bankCode: "ZLP",
    details: "Giao dịch thành công",
  },
];

export default function BasicTableOne() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const openModal = (order: Order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell

                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Kênh thanh toán
                </TableCell>
                <TableCell

                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Tiền đơn hàng
                </TableCell>
                <TableCell

                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Tiền thanh toán
                </TableCell>
                <TableCell

                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Ngày tạo
                </TableCell>
                <TableCell

                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Ngày thanh toán
                </TableCell>
                <TableCell

                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Mô tả
                </TableCell>
                <TableCell

                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Số tài khoản
                </TableCell>
                <TableCell

                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Mã đơn hàng
                </TableCell>
                <TableCell

                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Chi tiết
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={order.eduSource}
                          alt="Edu Source"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.orderAmount}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.paymentAmount}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.createdAt}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.paidAt}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.description}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.accountNumber}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.bankCode}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <button
                      className="text-blue-500 hover:underline "
                      onClick={() => openModal(order)}
                    >
                      ...
                    </button>
                  </TableCell>
                  {selectedOrder && (
                    <Dialog open={Boolean(selectedOrder)} onOpenChange={closeModal}>
                      <DialogContent className="bg-white transition-opacity duration-300 opacity-100">
                        <DialogTitle>Chi tiết đơn hàng</DialogTitle>
                        <DialogDescription>
                          <p><strong>Giá trị đơn hàng:</strong> {selectedOrder.orderAmount}</p>
                          <p><strong>Đã thanh toán:</strong> {selectedOrder.paymentAmount}</p>
                          <p><strong>Ngày tạo:</strong> {selectedOrder.createdAt}</p>
                          <p><strong>Ngày thanh toán:</strong> {selectedOrder.paidAt}</p>
                          <p><strong>Số tài khoản:</strong> {selectedOrder.accountNumber}</p>
                          <p><strong>Ngân hàng:</strong> {selectedOrder.bankCode}</p>
                          <p><strong>Mô tả:</strong> {selectedOrder.description}</p>
                          <p><strong>Chi tiết:</strong> {selectedOrder.details}</p>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  )}

                </TableRow>
              ))}
            </TableBody>

          </Table>

        </div>
      </div>
    </div>
  );
}
