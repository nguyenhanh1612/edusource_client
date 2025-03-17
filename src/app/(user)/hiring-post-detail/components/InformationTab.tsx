"use client";

import { useEffect, useState } from "react";
import useToast from "@/hooks/use-toast";
import { useParams, useSearchParams } from "next/navigation";
import { HiringPostDetailResponse } from "@/services/customer_request/definition";
import { assignTaskAPI, fetchDetailHiringPostByIdAPI, GetThePaymentURLAPI, updateStatusPaidAPI, uploadCompleteFileAPI, uploadDemoFileAPI } from "@/services/customer_request/api-service";
import { useAppSelector } from "@/stores/store";

const dummyImgBg = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrontVwpuWbJw-Cw6gv2XrpVHcVEEWfmMRXQ&s",
    "https://www.timeshighereducation.com/student/sites/default/files/istock-151597880.jpg",
    "https://www.robertsoncollege.com/site-content/uploads/2023/06/post-secondary-education-hero-2400px.jpg",
];



const getRandomImage = (bookImg: string, cateImg: string) => {
    return bookImg || cateImg || dummyImgBg[Math.floor(Math.random() * dummyImgBg.length)];
};
const dummyAvtCustomer = "https://vcdn1-giaitri.vnecdn.net/2016/08/11/minh-beo-19-3940-1470889667.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=79OWERTTXLyLiyFNBcKa9A"

const buttonClasses = "px-5 py-2.5 rounded-lg text-white font-semibold shadow-md transition-all";

const HiringPostDetailInforTab = () => {
    const { addToast } = useToast();
    const [mainData, setMainData] = useState<HiringPostDetailResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const { id, } = useParams();
    const searchParams = useSearchParams();
    const is_success = searchParams.get("is_success"); // "1"
    const postIdNumber = Number(id);
    const user = useAppSelector((state) => state.userSlice.user);
    const roleId = user?.roleId;
    const [inputPrice, setInputPrice] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setInputPrice(""); // Reset input field properly
    };


    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedDemoFile, setSelectedDemoFile] = useState<File | null>(null);


    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };
    const handleDemoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedDemoFile(event.target.files[0]);
        }
    };
    //#region handle button click

    //ASSIGN TASK TO ME
    // const handleAssignTaskToMe = async () => {
    //     try {
    //         //call API to assign task
    //         if (user) {
    //             const response = await assignTaskAPI(postIdNumber, user?.userId || "", user?.firstName + user?.lastName || "");

    //         }
    //         //show toast
    //         addToast({ description: "OK to assign task", type: "success", duration: 5000 });

    //         //update view
    //         setMainData((prev) => {
    //             if (prev && user) {
    //                 return { ...prev, staffId: user.userId, staffName: (user.firstName + user.lastName) || "Anonymous" };
    //             }
    //             return prev;
    //         });
    //     } catch (e) {
    //         addToast({ description: "Fail to assign task", type: "error", duration: 5000 });
    //     }
    // }
    const handleConfirmAssign = async () => {
        const price = inputPrice.trim() === "" ? 0 : Number(inputPrice);

        if (isNaN(price) || price < 0) {
            addToast({ description: "Hãy nhập giá phù hợp", type: "error", duration: 5000 });
            return;
        }

        try {
            // Call API to assign task
            if (user) {
                await assignTaskAPI(postIdNumber, user.userId, `${user.firstName} ${user.lastName}`, price);
            }

            // Show success toast
            addToast({ description: "Nhận đơn thành công", type: "success", duration: 5000 });

            // Update view
            setMainData((prev) => {
                if (prev && user) {
                    return { ...prev, staffId: user.userId, staffName: `${user.firstName} ${user.lastName}`, price };
                }
                return prev;
            });

            handleCloseModal();
        } catch (e) {
            addToast({ description: "Nhận đơn thất bại", type: "error", duration: 5000 });
        }
    };


    // UPLOAD FILE
    const handleUploadCompleteFile = async () => {
        try {
            if (!selectedFile) {
                addToast({ description: "Hãy chọn file", type: "warning", duration: 5000 });
                return;
            }

            // Call API to assign task
            const response = await uploadCompleteFileAPI(postIdNumber, selectedFile);

            // Show success toast
            addToast({ description: "Thành công", type: "success", duration: 5000 });

            // Update view
            setMainData((prev) => {
                if (prev && user) {
                    return { ...prev, file: response };
                }
                return prev;
            });
        } catch (e) {
            addToast({ description: "Thất bại khi tải file", type: "error", duration: 5000 });
        } finally {
            setSelectedFile(null);
        }
    };
    //UPLOAD DEMO FILE
    const handleUploadDemoFile = async () => {
        try {
            if (!selectedDemoFile) {
                addToast({ description: "Hãy chọn file", type: "warning", duration: 5000 });
                return;
            }

            // Call API to assign task
            const response = await uploadDemoFileAPI(postIdNumber, selectedDemoFile);


            // Show success toast
            addToast({ description: "Thành công", type: "success", duration: 5000 });

            // Update view
            setMainData((prev) => {
                if (prev && user) {
                    return { ...prev, demoFile: response, status: 'ready' };
                }
                return prev;
            });
        } catch (e) {
            addToast({ description: "Thất bại khi tải file", type: "error", duration: 5000 });
        } finally {
            setSelectedDemoFile(null);
        }
    };


    //CHECKOUT
    const handleCheckoutClicked = async () => {
        try {
            if (mainData) {
                const paymentUrl = await GetThePaymentURLAPI(mainData?.id, mainData?.title, mainData?.price);
                window.location.href = paymentUrl;
            }
        } catch (e) {
            addToast({ description: "Lỗi khi thanh toán", type: "error", duration: 5000 });

        }
    }


    //#endregion

    //HANDLE INTERVAL REPLACE THE BG IMG
    useEffect(() => {
        const interval = setInterval(() => {

        }, 3000);
        return () => clearInterval(interval); // Cleanup to prevent memory leaks
    }, []);

    useEffect(() => {
        const loadHiringPost = async () => {
            try {
                const res = await fetchDetailHiringPostByIdAPI(postIdNumber);
                setMainData(res);

            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        const checkBeforeFetching = async () => {
            try {

                if (is_success === "1") {
                    addToast({ description: "Thanh toán thành công", type: "success", duration: 5000 });
                    const res = await updateStatusPaidAPI(postIdNumber);
                }

            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        checkBeforeFetching();
        loadHiringPost();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (!mainData) {
        return <p className="text-center text-gray-500">Chưa có dữ liệu.</p>;
    }



    return (
        <div className="w-full min-h-screen p-8 bg-gray-100 flex justify-center">
            <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl overflow-hidden p-8">

                <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl overflow-hidden p-8">
                    {/* Book Image */}
                    <img
                        src={getRandomImage(mainData.requirementCateImg, mainData.bookImg)}
                        alt="Sách"
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                    />

                    {/* Customer Info */}
                    <div className="flex items-center gap-6 mt-6">
                        <img
                            src={mainData.customerAvt || dummyAvtCustomer} // Provide a default avatar
                            alt="Ảnh đại diện"
                            className="w-20 h-20 rounded-full border-4 border-gray-300 shadow-sm"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{mainData.title || "Không xác định"}</h2>
                            <p className="text-gray-500 text-lg">{mainData.customerName || "Không xác định"}</p>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="mt-6 space-y-6">
                        {/* Description */}
                        <div>
                            <p className="text-gray-500 font-semibold">Diễn tả</p>
                            <p className="text-gray-700 leading-relaxed p-4 bg-gray-100 rounded-lg">
                                {mainData.description || "Không có diễn tả"}
                            </p>
                        </div>

                        {/* Theme */}
                        <div>
                            <p className="text-gray-500 font-semibold">Chủ đề thiết kế</p>
                            <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg">
                                {mainData.requirementCate || "Không xác định"}
                            </span>
                        </div>

                        {/* Price */}
                        <div>
                            <p className="text-gray-500 font-semibold">Giá</p>
                            <span className="px-3 py-1 text-sm font-medium text-black-700 bg-orange-100 rounded-lg">
                                {mainData.price != null && mainData.price >= 0 ? `${mainData.price} VND` : "Chưa xác định"}
                            </span>
                        </div>
                        {/* Assigned To */}
                        <div>
                            <p className="text-gray-500 font-semibold">Nhân viên</p>
                            <p className="text-gray-700">{mainData.staffName || "Chưa có"}</p>
                        </div>

                        {/* Created At */}
                        <div>
                            <p className="text-gray-500 font-semibold">Đăng tải</p>
                            {/* {new Date(post.createdAt).toLocaleDateString()} */}
                            <p className="text-gray-700">{mainData.createdAt ? new Date(mainData.createdAt).toLocaleDateString() : "Không xác định"}</p>
                        </div>

                        {/* Status as Tag */}
                        <div>
                            <p className="text-gray-500 font-semibold">Trạng thái</p>
                            <span className={`px-3 py-1 text-sm font-medium rounded-lg 
                                    ${mainData.status === "Completed"
                                    ? "text-green-700 bg-green-100"
                                    : mainData.status === "Ready"
                                        ? "text-blue-700 bg-blue-100"
                                        : mainData.status === "Pending"
                                            ? "text-yellow-700 bg-yellow-100"
                                            : "text-gray-700 bg-gray-100"
                                }`}>
                                {(() => {
                                    if (mainData.status === "completed") {
                                        return "HOÀN THÀNH";
                                    } else if (mainData.status === "pending") {
                                        return "ĐANG CHỜ";
                                    } else if (mainData.status === "ready") {
                                        return "SẴN SÀNG";
                                    } else {
                                        return "Không xác định";
                                    }
                                })()}
                            </span>
                        </div>


                        {/* Category as Tag
                        <div>
                            <p className="text-gray-500 font-semibold">Category</p>
                            <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-lg">
                                {mainData.requirementCate || "No category"}
                            </span>
                        </div> */}

                        {/* Book Name */}
                        <div>
                            <p className="text-gray-500 font-semibold">Tựa sách</p>
                            <p className="text-gray-700 font-medium">{mainData.bookName || "Không xác định sách"}</p>
                        </div>
                        {/* Some other attribute relating to types */}
                        {(mainData.fileType || mainData.sourceType || mainData.contentType) && (
                            <div>
                                <p className="text-gray-500 font-semibold">Phân loại</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {mainData.fileType && (
                                        <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg">
                                            {mainData.fileType}
                                        </span>
                                    )}
                                    {mainData.sourceType && (
                                        <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
                                            {mainData.sourceType}
                                        </span>
                                    )}
                                    {mainData.contentType && (
                                        <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-lg">
                                            {mainData.contentType}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}


                        {/* Files region */}
                        <div className="mt-6 flex flex-wrap items-center gap-6">
                            {/* Demo File */}
                            <div className="flex-1 min-w-[200px]">
                                <p className="text-gray-500 font-semibold mb-2">Bản xem trước</p>
                                {mainData.demoFile ? (
                                    <a
                                        href={mainData.demoFile}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                                    >
                                        📘  Xem bản xem trước
                                    </a>
                                ) : (
                                    <span className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg shadow-sm">
                                        ❌ Chưa sẵn sàng
                                    </span>
                                )}
                            </div>

                            {/* Complete File */}
                            <div className="flex-1 min-w-[200px]">
                                <p className="text-gray-500 font-semibold mb-2">Bản hoàn chỉnh</p>
                                {mainData.file && ((user?.roleId != 2) || mainData.status == 'completed')
                                    ? (
                                        <a
                                            href={mainData.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all"
                                        >
                                            📂 Xem bản hoàn chỉnh
                                        </a>
                                    ) : (
                                        <span className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg shadow-sm">
                                            ❌ Chưa sẵn sàng
                                        </span>
                                    )}
                            </div>
                        </div>





                    </div>
                </div>



                <div className="mt-8 flex flex-wrap gap-4">
                    {/* Common button styles */}

                    {/* Action button for : Member role */}
                    {roleId === 2 && mainData.status === "ready" && (
                        <button className={`${buttonClasses} bg-blue-600 hover:bg-blue-700`} onClick={handleCheckoutClicked}>
                            Checkout
                        </button>
                    )}

                    {/* Action buttons for : Staff role */}
                    {roleId !== 2 &&
                        (mainData.status === "pending" && !mainData.staffId ? (
                            <button onClick={handleOpenModal} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                                Nhận đơn
                            </button>
                        ) : (
                            (mainData.status !== "completed" && !mainData.file) && (
                                <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-md w-fit bg-white">
                                    {mainData.status === "ready" && (
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                className="border p-2 rounded-md"
                                            />
                                            <button
                                                onClick={handleUploadCompleteFile}
                                                className={`${buttonClasses} bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md`}
                                            >
                                                Tải file hoàn chỉnh
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="file"
                                            onChange={handleDemoFileChange}
                                            className="border p-2 rounded-md"
                                        />
                                        <button
                                            onClick={handleUploadDemoFile}
                                            className={`${buttonClasses} bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md`}
                                        >
                                            Tải file demo
                                        </button>
                                    </div>
                                </div>
                            )


                        ))}
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">Enter Price</h2>

                        <input
                            type="number"
                            value={inputPrice}
                            onChange={(e) => setInputPrice(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Enter price"
                        />

                        <div className="flex justify-end space-x-3">
                            <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-500 text-white rounded">
                                Cancel
                            </button>
                            <button onClick={handleConfirmAssign} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>

    );
};

export default HiringPostDetailInforTab;
