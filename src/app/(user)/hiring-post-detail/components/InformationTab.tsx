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
    "https://www.skillstork.org/blog/wp-content/uploads/2022/11/modern-education-Skillstork.jpg",
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
    const [inputPrice, setInputPrice] = useState<number>(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setInputPrice(-1); // Reset input
    };



    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
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
        if (inputPrice < 0) {
            addToast({ description: "Please enter a valid price", type: "error", duration: 5000 });
            return;
        }

        try {
            // Call API to assign task
            if (user) {
                await assignTaskAPI(postIdNumber, user.userId, `${user.firstName} ${user.lastName}`, inputPrice);
            }

            // Show success toast
            addToast({ description: "OK to assign task", type: "success", duration: 5000 });

            // Update view
            setMainData((prev) => {
                if (prev && user) {
                    return { ...prev, staffId: user.userId, staffName: `${user.firstName} ${user.lastName}`, price: inputPrice };
                }
                return prev;
            });

            handleCloseModal();
        } catch (e) {
            addToast({ description: "Fail to assign task", type: "error", duration: 5000 });
        }
    };


    // UPLOAD FILE
    const handleUploadCompleteFile = async () => {
        try {
            if (!selectedFile) {
                addToast({ description: "Please select a file first", type: "warning", duration: 5000 });
                return;
            }

            // Call API to assign task
            const response = await uploadCompleteFileAPI(postIdNumber, selectedFile);

            // Show success toast
            addToast({ description: "OK to complete file", type: "success", duration: 5000 });

            // Update view
            setMainData((prev) => {
                if (prev && user) {
                    return { ...prev, file: response };
                }
                return prev;
            });
        } catch (e) {
            addToast({ description: "Fail to upload complete file", type: "error", duration: 5000 });
        } finally {
            setSelectedFile(null);
        }
    };
    //UPLOAD DEMO FILE
    const handleUploadDemoFile = async () => {
        try {
            if (!selectedFile) {
                addToast({ description: "Please select a file first", type: "warning", duration: 5000 });
                return;
            }

            // Call API to assign task
            const response = await uploadDemoFileAPI(postIdNumber, selectedFile);


            // Show success toast
            addToast({ description: "OK to demo file", type: "success", duration: 5000 });

            // Update view
            setMainData((prev) => {
                if (prev && user) {
                    return { ...prev, demoFile: response, status: 'ready' };
                }
                return prev;
            });
        } catch (e) {
            addToast({ description: "Fail to upload demo file", type: "error", duration: 5000 });
        } finally {
            setSelectedFile(null);
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
            addToast({ description: "Something wrong when checking out", type: "error", duration: 5000 });

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
                    addToast({ description: "Checkout successfully", type: "success", duration: 5000 });
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
        return <p className="text-center text-gray-500">No data available.</p>;
    }



    return (
        <div className="w-full min-h-screen p-8 bg-gray-100 flex justify-center">
            <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl overflow-hidden p-8">

                <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl overflow-hidden p-8">
                    {/* Book Image */}
                    <img
                        src={getRandomImage(mainData.requirementCateImg, mainData.bookImg)}
                        alt="Book"
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                    />

                    {/* Customer Info */}
                    <div className="flex items-center gap-6 mt-6">
                        <img
                            src={mainData.customerAvt || dummyAvtCustomer} // Provide a default avatar
                            alt="Avatar"
                            className="w-20 h-20 rounded-full border-4 border-gray-300 shadow-sm"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{mainData.title || "No title"}</h2>
                            <p className="text-gray-500 text-lg">{mainData.customerName || "Anonymous"}</p>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="mt-6 space-y-6">
                        {/* Description */}
                        <div>
                            <p className="text-gray-500 font-semibold">Description</p>
                            <p className="text-gray-700 leading-relaxed p-4 bg-gray-100 rounded-lg">
                                {mainData.description || "No description provided"}
                            </p>
                        </div>

                        {/* Theme */}
                        <div>
                            <p className="text-gray-500 font-semibold">Theme</p>
                            <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg">
                                {mainData.requirementCate || "No category"}
                            </span>
                        </div>

                        {/* Price */}
                        <div>
                            <p className="text-gray-500 font-semibold">Price</p>
                            <span className="px-3 py-1 text-sm font-medium text-black-700 bg-orange-100 rounded-lg">
                                {mainData.price >= 0 ? mainData.price : "Undefined"}
                            </span>
                        </div>
                        {/* Assigned To */}
                        <div>
                            <p className="text-gray-500 font-semibold">Assigned to</p>
                            <p className="text-gray-700">{mainData.staffName || "Not assigned"}</p>
                        </div>

                        {/* Created At */}
                        <div>
                            <p className="text-gray-500 font-semibold">Created at</p>
                            <p className="text-gray-700">{mainData.createdAt ? mainData.createdAt.toString() : "Unknown date"}</p>
                        </div>

                        {/* Deleted At */}
                        <div>
                            <p className="text-gray-500 font-semibold">Deleted at</p>
                            <p className="text-gray-700">{mainData.deletedAt ? mainData.deletedAt.toString() : "Not deleted yet"}</p>
                        </div>

                        {/* Status as Tag */}
                        <div>
                            <p className="text-gray-500 font-semibold">Status</p>
                            <span className={`px-3 py-1 text-sm font-medium rounded-lg 
                                    ${mainData.status === "Completed"
                                    ? "text-green-700 bg-green-100"
                                    : mainData.status === "Ready"
                                        ? "text-blue-700 bg-blue-100"
                                        : mainData.status === "Pending"
                                            ? "text-yellow-700 bg-yellow-100"
                                            : "text-gray-700 bg-gray-100"
                                }`}>
                                {mainData.status.toUpperCase() || "Unknown"}
                            </span>
                        </div>


                        {/* Category as Tag */}
                        <div>
                            <p className="text-gray-500 font-semibold">Category</p>
                            <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-lg">
                                {mainData.requirementCate || "No category"}
                            </span>
                        </div>

                        {/* Book Name */}
                        <div>
                            <p className="text-gray-500 font-semibold">Book Name</p>
                            <p className="text-gray-700 font-medium">{mainData.bookName || "Unknown Book"}</p>
                        </div>
                        {/* Some other attribute relating to types */}
                        <div>
                            <p className="text-gray-500 font-semibold">Types</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg">
                                    {mainData.fileType || "Unknown file type"}
                                </span>
                                <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
                                    {mainData.sourceType || "Unknown source type"}
                                </span>
                                <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-lg">
                                    {mainData.contentType || "Unknown content type"}
                                </span>
                            </div>
                        </div>

                        {/* Files region */}
                        <div className="mt-6 flex flex-wrap items-center gap-6">
                            {/* Demo File */}
                            <div className="flex-1 min-w-[200px]">
                                <p className="text-gray-500 font-semibold mb-2">Demo File</p>
                                {mainData.demoFile ? (
                                    <a
                                        href={mainData.demoFile}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all"
                                    >
                                        📘  View Demo File
                                    </a>
                                ) : (
                                    <span className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg shadow-sm">
                                        ❌ Not Available
                                    </span>
                                )}
                            </div>

                            {/* Complete File */}
                            <div className="flex-1 min-w-[200px]">
                                <p className="text-gray-500 font-semibold mb-2">Complete File</p>
                                {mainData.file && ((user?.roleId != 2) || mainData.status == 'completed')
                                    ? (
                                        <a
                                            href={mainData.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all"
                                        >
                                            📂 View Complete File
                                        </a>
                                    ) : (
                                        <span className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg shadow-sm">
                                            ❌ Not Available
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
                            // <button onClick={handleAssignTaskToMe} className={`${buttonClasses} bg-blue-600 hover:bg-blue-700`}>
                            //     Assign Task To Me
                            // </button>
                            <button onClick={handleOpenModal} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                                Assign Task To Me
                            </button>
                        ) : (
                            <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-md w-fit bg-white">
                                <div className="flex items-center gap-2">
                                    <input type="file" onChange={handleFileChange} className="border p-2 rounded-md" />
                                    <button onClick={handleUploadCompleteFile} className={`${buttonClasses} bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md`}>
                                        Upload File
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="file" onChange={handleFileChange} className="border p-2 rounded-md" />
                                    <button onClick={handleUploadDemoFile} className={`${buttonClasses} bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md`}>
                                        Upload Demo File
                                    </button>
                                </div>
                            </div>

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
                            onChange={(e) => setInputPrice(Number(e.target.value))}
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
