"use client"
import React, { useState } from 'react';
import UploadPhoto from '@/components/upload-file';

function UploadFile() {
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0); 
    const [isUploaded, setIsUploaded] = useState<boolean>(false); 
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
    });
    const [error, setError] = useState<string | null>(null);
   
    const handleFileSelect = (file: File | null, filePreview: string | null, fileInfo: { name: string; size: number } | null) => {
        setFile(file);
        setFilePreview(filePreview);
        setFileInfo(fileInfo);
    };

    const handleCancel = () => {
        setFile(null);
        setFilePreview(null);
        setFileInfo(null);
        setUploadProgress(0);
        setIsUploaded(false);
        setFormData({
            title: '',
            description: '',
            price: '',
            category: '',
        });
    };

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'price') {
            const sanitizedValue = value.replace(/[^0-9]/g, '');
            const numericValue = parseInt(sanitizedValue || '0', 10);
            
            if (numericValue < 1000) {
                setError('Giá phải lớn hơn hoặc bằng 1,000 VND.');
            } else if (numericValue > 1000000000) {
                setError('Giá không được vượt quá 1,000,000,000 VND.');
            } else {
                setError(null);
            }

            setFormData((prevData) => ({
                ...prevData,
                [name]: numericValue.toLocaleString('vi-VN'),
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };



    return (
        <div className="flex h-screen items-center justify-center mt-32 mb-32">
            <div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
                <div className="flex justify-center py-4">
                    <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                        </svg>
                    </div>
                </div>

                <div className="flex justify-center">
                    <h1 className="text-gray-600 font-bold md:text-2xl text-xl">Upload Form</h1>
                </div>

                <div className="grid grid-cols-1 mt-5 mx-7">
                    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Tiêu đề</label>
                    <input
                        className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Tiêu đề"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                    <div className="grid grid-cols-1">
                        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Mô tả</label>
                        <input
                            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Mô tả"
                        />
                    </div>
                    <div className="grid grid-cols-1">
                        <div className="flex items-center justify-between">
                            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Giá</label>
                            {error && <p className="text-red-500 text-xs ml-2">{error}</p>}
                        </div>
                        <input
                            className={`py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 ${error
                                ? 'border-red-500 focus:ring-red-600'
                                : 'border-purple-300 focus:ring-purple-600'
                                }`}
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Giá"
                        />
                    </div>

                </div>

                <div className="grid grid-cols-1 mt-5 mx-7">
                    <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Thể loại</label>
                    <select
                        className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                    >
                        <option>Ngữ pháp</option>
                        <option>Phát âm</option>
                        <option>Từ vựng</option>
                    </select>
                </div>

                <UploadPhoto onFileSelect={handleFileSelect}/>

                <div className="flex items-center justify-center md:gap-8 gap-4 pt-5 pb-5">
                    <button
                        className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
                        onClick={() => setFormData({ title: '', description: '', price: '', category: '' })}
                    >
                        Cancel
                    </button>
                    <button
                        className={`w-auto rounded-lg shadow-xl font-medium text-white px-4 py-2 ${error ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-700'
                            }`}
                        disabled={!!error} 
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadFile;
