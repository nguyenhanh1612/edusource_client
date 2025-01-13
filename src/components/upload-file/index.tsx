import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";

interface FileInfo {
    name: string;
    size: number;
    type: string;
}

interface UploadPhotoProps {
    onFileSelect: (file: File | null, filePreview: string | null, fileInfo: FileInfo | null) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onFileSelect }) => {
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;

        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            setFile(selectedFile);
            setFilePreview(previewUrl);
            const info = { name: selectedFile.name, size: selectedFile.size, type: selectedFile.type };
            setFileInfo(info);


            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    setIsUploaded(true);
                }
            }, 500);

            onFileSelect(selectedFile, previewUrl, info);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFilePreview(null);
        setFileInfo(null);
        setUploadProgress(0);
        setIsUploaded(false);
        onFileSelect(null, null, null);
    };

    return (
        <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
                Upload Photo or Video...
            </label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
                    <div className="flex flex-col items-center justify-center pt-7">
                        <svg
                            className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                            Select a photo or video
                        </p>
                    </div>
                    <input type="file" accept="image/*,video/*,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" className="hidden" onChange={handleFileChange} />
                </label>
            </div>

            {file && !isUploaded && (
                <div className="mt-5">
                    <div className="bg-gray-300 rounded-full w-full h-2.5">
                        <div
                            className="w-full h-full rounded-full bg-blue-600 flex items-center relative"
                            style={{ width: `${uploadProgress}%` }}
                        >
                            <span className="absolute text-xs right-0.5 bg-white w-2 h-2 rounded-full"></span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 font-semibold mt-2">{uploadProgress}% done</p>
                </div>
            )}

            {isUploaded && file && fileInfo && (
                <div className="mt-5 mx-7">
                    <div className="flex items-center justify-between">
                        <h2 className="text-gray-600 font-semibold">File Information:</h2>
                        <IoClose className="text-2xl" onClick={handleRemoveFile} />
                    </div>
                    <p><strong>Name:</strong> {fileInfo.name}</p>
                    <p><strong>Size:</strong> {Math.round(fileInfo.size / 1024)} KB</p>
                    <p><strong>Type:</strong> {fileInfo.type}</p>
                    <div>
                        <strong>Preview:</strong>
                        {fileInfo && filePreview ? (
                            fileInfo.type.startsWith("image/") ? (
                                <>
                                    <img
                                        src={filePreview}
                                        alt="Image Preview"
                                        className="mt-2 w-32 h-32 object-cover cursor-pointer"
                                        onClick={() => setIsImageModalOpen(true)}
                                    />
                                    {isImageModalOpen && (
                                        <div
                                            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                                            onClick={() => setIsImageModalOpen(false)}
                                        >
                                            <img
                                                src={filePreview}
                                                alt="Full Size Image"
                                                className="max-w-full max-h-full rounded"
                                            />
                                        </div>
                                    )}
                                </>
                            ) : fileInfo.type.startsWith("video/") ? (
                                <video controls className="mt-2 w-64 h-36">
                                    <source src={filePreview} type={fileInfo.type} />
                                    Your browser does not support the video tag.
                                </video>
                            ) : fileInfo.type === "application/pdf" ? (
                                <div className="mt-2 w-full max-w-full h-32 overflow-hidden border border-gray-300 rounded-md">
                                    <iframe
                                        src={filePreview}
                                        title="PDF Preview"
                                        className="w-full h-full"
                                        style={{ overflow: "auto" }}
                                    />
                                </div>
                            ) : fileInfo.type === "application/vnd.ms-excel" ||
                                fileInfo.type ===
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
                                <div className="mt-2">
                                    <a
                                        href={filePreview}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        View Excel File
                                    </a>
                                </div>
                            ) : (
                                <p className="mt-2 text-gray-500">
                                    No preview available for this file type.
                                </p>
                            )
                        ) : (
                            <p className="mt-2 text-gray-500">No file selected.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadPhoto;
