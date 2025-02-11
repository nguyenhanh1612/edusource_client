// import React, { useEffect, useState } from 'react';
// import { IoClose } from "react-icons/io5";

// interface FileInfo {
//     name: string;
//     size: number;
//     type: string;
// }

// interface UploadPhotoProps {
//     onFileUpload: (file: File | null, filePreview: string | null, fileInfo: FileInfo | null) => void;
//     onFileSelect: (file: File | null, filePreview: string | null, fileInfo: FileInfo | null) => void;
//     onOtherImagesSelect?: (files: FileList | null, previews: string[] | null, fileInfos: FileInfo[] | null) => void;
// }

// const UploadPhoto: React.FC<UploadPhotoProps> = ({ onFileSelect, onOtherImagesSelect }) => {
//     const [file, setFile] = useState<File | null>(null);
//     const [filePreview, setFilePreview] = useState<string | null>(null);
//     const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
//     const [uploadProgress, setUploadProgress] = useState<number>(0);
//     const [isUploaded, setIsUploaded] = useState<boolean>(false);
//     const [isImageModalOpen, setIsImageModalOpen] = useState(false);

//     const [otherFiles, setOtherFiles] = useState<File[]>([]);
//     const [otherPreviews, setOtherPreviews] = useState<string[]>([]);
//     const [otherFileInfos, setOtherFileInfos] = useState<FileInfo[]>([]);

//     useEffect(() => {
//         return () => { 
//             otherPreviews.forEach(previewUrl => URL.revokeObjectURL(previewUrl));
//             if(filePreview) URL.revokeObjectURL(filePreview);
//         };
//     }, [otherPreviews, filePreview]); 

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedFile = e.target.files ? e.target.files[0] : null;

//         if (selectedFile) {
//             const previewUrl = URL.createObjectURL(selectedFile);
//             setFile(selectedFile);
//             setFilePreview(previewUrl);
//             const info = { name: selectedFile.name, size: selectedFile.size, type: selectedFile.type };
//             setFileInfo(info);


//             let progress = 0;
//             const interval = setInterval(() => {
//                 progress += 10;
//                 setUploadProgress(progress);
//                 if (progress >= 100) {
//                     clearInterval(interval);
//                     setIsUploaded(true);
//                 }
//             }, 500);

//             onFileSelect(selectedFile, previewUrl, info);
//         }
//     };

//     const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedFile = e.target.files ? e.target.files[0] : null;

//         if (selectedFile) {
//             const previewUrl = URL.createObjectURL(selectedFile);
//             setFile(selectedFile);
//             setFilePreview(previewUrl);
//             const info = { name: selectedFile.name, size: selectedFile.size, type: selectedFile.type };
//             setFileInfo(info);


//             let progress = 0;
//             const interval = setInterval(() => {
//                 progress += 10;
//                 setUploadProgress(progress);
//                 if (progress >= 100) {
//                     clearInterval(interval);
//                     setIsUploaded(true);
//                 }
//             }, 500);

//             onFileSelect(selectedFile, previewUrl, info);
//         }
//     };

//     const handleOtherImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedFiles = e.target.files;

//         if (selectedFiles) {
//             const fileList = Array.from(selectedFiles);
//             const newPreviews: string[] = [];
//             const newFileInfos: FileInfo[] = [];

//             fileList.forEach(selectedFile => {
//                 try {
//                     const previewUrl = URL.createObjectURL(selectedFile);
//                     newPreviews.push(previewUrl);
//                     newFileInfos.push({ name: selectedFile.name, size: selectedFile.size, type: selectedFile.type });
//                 } catch (error) {
//                     console.error("Error creating preview URL:", error);
//                 }
//             });


//             setOtherFiles(prevFiles => [...prevFiles, ...fileList]);
//             setOtherPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
//             setOtherFileInfos(prevFileInfos => [...prevFileInfos, ...newFileInfos]);

//             if (onOtherImagesSelect) {
//                 onOtherImagesSelect([...otherFiles, ...fileList] as unknown as FileList, [...otherPreviews, ...newPreviews], [...otherFileInfos, ...newFileInfos]);
//             }
//         }
//     };


//     const handleRemoveFile = () => {
//         setFile(null);
//         setFilePreview(null);
//         setFileInfo(null);
//         setUploadProgress(0);
//         setIsUploaded(false);
//         onFileSelect(null, null, null);
//     };

//     const handleRemoveOtherImage = (index: number) => {
//         const updatedFiles = [...otherFiles];
//         const updatedPreviews = [...otherPreviews];
//         const updatedFileInfos = [...otherFileInfos];

//         updatedFiles.splice(index, 1);
//         updatedPreviews.splice(index, 1);
//         updatedFileInfos.splice(index, 1);

//         setOtherFiles(updatedFiles);
//         setOtherPreviews(updatedPreviews);
//         setOtherFileInfos(updatedFileInfos);

//         if (onOtherImagesSelect) {
//             onOtherImagesSelect(updatedFiles.length > 0 ? updatedFiles as unknown as FileList : null, updatedPreviews, updatedFileInfos); // Cần ép kiểu về FileList
//         }
//     };

//     return (
//         <div className="grid grid-cols-1 mt-5 mx-7">
//             <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
//                 Thêm file
//             </label>
//             <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
//                     <div className="flex flex-col items-center justify-center pt-7">
//                         <svg
//                             className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                             />
//                         </svg>
//                         <p className="text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
//                             Select a photo or video
//                         </p>
//                     </div>
//                     <input type="file" accept="image/*,video/*,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" className="hidden" onChange={handleUploadFile} />
//                 </label>
//             </div>

//             {file && !isUploaded && (
//                 <div className="mt-5">
//                     <div className="bg-gray-300 rounded-full w-full h-2.5">
//                         <div
//                             className="w-full h-full rounded-full bg-blue-600 flex items-center relative"
//                             style={{ width: `${uploadProgress}%` }}
//                         >
//                             <span className="absolute text-xs right-0.5 bg-white w-2 h-2 rounded-full"></span>
//                         </div>
//                     </div>
//                     <p className="text-sm text-gray-400 font-semibold mt-2">{uploadProgress}% done</p>
//                 </div>
//             )}

//             {isUploaded && file && fileInfo && (
//                 <div className="mt-5 mx-7">
//                     <div className="flex items-center justify-between">
//                         <h2 className="text-gray-600 font-semibold">File Information:</h2>
//                         <IoClose className="text-2xl" onClick={handleRemoveFile} />
//                     </div>
//                     <p><strong>Name:</strong> {fileInfo.name}</p>
//                     <p><strong>Size:</strong> {Math.round(fileInfo.size / 1024)} KB</p>
//                     <p><strong>Type:</strong> {fileInfo.type}</p>
//                     <div>
//                         <strong>Preview:</strong>
//                         {fileInfo && filePreview ? (
//                             fileInfo.type.startsWith("image/") ? (
//                                 <>
//                                     <img
//                                         src={filePreview}
//                                         alt="Image Preview"
//                                         className="mt-2 w-32 h-32 object-cover cursor-pointer"
//                                         onClick={() => setIsImageModalOpen(true)}
//                                     />
//                                     {isImageModalOpen && (
//                                         <div
//                                             className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
//                                             onClick={() => setIsImageModalOpen(false)}
//                                         >
//                                             <img
//                                                 src={filePreview}
//                                                 alt="Full Size Image"
//                                                 className="max-w-full max-h-full rounded"
//                                             />
//                                         </div>
//                                     )}
//                                 </>
//                             ) : fileInfo.type.startsWith("video/") ? (
//                                 <video controls className="mt-2 w-64 h-36">
//                                     <source src={filePreview} type={fileInfo.type} />
//                                     Your browser does not support the video tag.
//                                 </video>
//                             ) : fileInfo.type === "application/pdf" ? (
//                                 <div className="mt-2 w-full max-w-full h-32 overflow-hidden border border-gray-300 rounded-md">
//                                     <iframe
//                                         src={filePreview}
//                                         title="PDF Preview"
//                                         className="w-full h-full"
//                                         style={{ overflow: "auto" }}
//                                     />
//                                 </div>
//                             ) : fileInfo.type === "application/vnd.ms-excel" ||
//                                 fileInfo.type ===
//                                 "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
//                                 <div className="mt-2">
//                                     <a
//                                         href={filePreview}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-500 underline"
//                                     >
//                                         View Excel File
//                                     </a>
//                                 </div>
//                             ) : (
//                                 <p className="mt-2 text-gray-500">
//                                     No preview available for this file type.
//                                 </p>
//                             )
//                         ) : (
//                             <p className="mt-2 text-gray-500">No file selected.</p>
//                         )}
//                     </div>
//                 </div>
//             )}

//             <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
//                 Thêm ảnh chính
//             </label>
//             <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
//                     <div className="flex flex-col items-center justify-center pt-7">
//                         <svg
//                             className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                             />
//                         </svg>
//                         <p className="text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
//                             Chọn ảnh chính
//                         </p>
//                     </div>
//                     <input type="file" accept="image/" className="hidden" onChange={handleFileChange} />
//                 </label>
//             </div>

//             {file && !isUploaded && (
//                 <div className="mt-5">
//                     <div className="bg-gray-300 rounded-full w-full h-2.5">
//                         <div
//                             className="w-full h-full rounded-full bg-blue-600 flex items-center relative"
//                             style={{ width: `${uploadProgress}%` }}
//                         >
//                             <span className="absolute text-xs right-0.5 bg-white w-2 h-2 rounded-full"></span>
//                         </div>
//                     </div>
//                     <p className="text-sm text-gray-400 font-semibold mt-2">{uploadProgress}% done</p>
//                 </div>
//             )}

//             {isUploaded && file && fileInfo && (
//                 <div className="mt-5 mx-7">
//                     <div className="flex items-center justify-between">
//                         <h2 className="text-gray-600 font-semibold">File Information:</h2>
//                         <IoClose className="text-2xl" onClick={handleRemoveFile} />
//                     </div>
//                     <p><strong>Name:</strong> {fileInfo.name}</p>
//                     <p><strong>Size:</strong> {Math.round(fileInfo.size / 1024)} KB</p>
//                     <p><strong>Type:</strong> {fileInfo.type}</p>
//                     <div>
//                         <strong>Preview:</strong>
//                         {fileInfo && filePreview ? (
//                             fileInfo.type.startsWith("image/") ? (
//                                 <>
//                                     <img
//                                         src={filePreview}
//                                         alt="Image Preview"
//                                         className="mt-2 w-32 h-32 object-cover cursor-pointer"
//                                         onClick={() => setIsImageModalOpen(true)}
//                                     />
//                                     {isImageModalOpen && (
//                                         <div
//                                             className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
//                                             onClick={() => setIsImageModalOpen(false)}
//                                         >
//                                             <img
//                                                 src={filePreview}
//                                                 alt="Full Size Image"
//                                                 className="max-w-full max-h-full rounded"
//                                             />
//                                         </div>
//                                     )}
//                                 </>
//                             ) : fileInfo.type.startsWith("video/") ? (
//                                 <video controls className="mt-2 w-64 h-36">
//                                     <source src={filePreview} type={fileInfo.type} />
//                                     Your browser does not support the video tag.
//                                 </video>
//                             ) : fileInfo.type === "application/pdf" ? (
//                                 <div className="mt-2 w-full max-w-full h-32 overflow-hidden border border-gray-300 rounded-md">
//                                     <iframe
//                                         src={filePreview}
//                                         title="PDF Preview"
//                                         className="w-full h-full"
//                                         style={{ overflow: "auto" }}
//                                     />
//                                 </div>
//                             ) : fileInfo.type === "application/vnd.ms-excel" ||
//                                 fileInfo.type ===
//                                 "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
//                                 <div className="mt-2">
//                                     <a
//                                         href={filePreview}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-500 underline"
//                                     >
//                                         View Excel File
//                                     </a>
//                                 </div>
//                             ) : (
//                                 <p className="mt-2 text-gray-500">
//                                     No preview available for this file type.
//                                 </p>
//                             )
//                         ) : (
//                             <p className="mt-2 text-gray-500">No file selected.</p>
//                         )}
//                     </div>
//                 </div>
//             )}

//             <label className="uppercase md:text-sm text-xs text-gray-500 font-light font-semibold mb-1">
//                 Upload Other Images
//             </label>
//             <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
//                     <div className="flex flex-col items-center justify-center pt-7">
//                         {/* ... (Icon and text - can be customized) */}
//                         <p className="text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
//                             Select other images
//                         </p>
//                     </div>
//                     <input type="file" accept="image/*" multiple className="hidden" onChange={handleOtherImagesChange} />

//                 </label>
//             </div>

//             {otherFiles.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-2 max-h-[200px] overflow-auto">
//                     {otherPreviews.map((preview, index) => (
//                         <div key={index} className="flex items-center mb-2">
//                             <img src={preview} alt={`Image ${index + 1}`} className="w-16 h-16 object-cover mr-2" />
//                             <div className="flex flex-col">
//                                 <p className="text-gray-600 font-semibold">{otherFileInfos[index].name}</p>
//                                 <p className="text-gray-500 text-xs">{Math.round(otherFileInfos[index].size / 1024)} KB</p>
//                             </div>
//                             <IoClose className="text-2xl ml-auto cursor-pointer" onClick={() => handleRemoveOtherImage(index)} />
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UploadPhoto;


import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";

interface FileInfo {
    name: string;
    size: number;
    type: string;
}

interface UploadPhotoProps {
    onMainImageSelect: (file: File | null, filePreview: string | null, fileInfo: FileInfo | null) => void;
    // onFileUpload: (file: File | null, filePreview: string | null, fileInfo: FileInfo | null, size: number) => void;
    onFileUpload: (file: File | null, preview: string | null, size: number | null) => void;
    onOtherImagesSelect?: (files: FileList | null, previews: string[] | null, fileInfos: FileInfo[] | null) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onMainImageSelect, onFileUpload, onOtherImagesSelect }) => {
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
    const [mainImageInfo, setMainImageInfo] = useState<FileInfo | null>(null);

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadedFilePreview, setUploadedFilePreview] = useState<string | null>(null);
    const [uploadedFileInfo, setUploadedFileInfo] = useState<FileInfo | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploaded, setIsUploaded] = useState<boolean>(false);

    const [otherFiles, setOtherFiles] = useState<File[]>([]);
    const [otherPreviews, setOtherPreviews] = useState<string[]>([]);
    const [otherFileInfos, setOtherFileInfos] = useState<FileInfo[]>([]);
    const [filePreview, setFilePreview] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
            if (uploadedFilePreview) URL.revokeObjectURL(uploadedFilePreview);
            otherPreviews.forEach(previewUrl => URL.revokeObjectURL(previewUrl));
            if (filePreview) URL.revokeObjectURL(filePreview);
        };
    }, [mainImagePreview, uploadedFilePreview, otherPreviews, filePreview]);



    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;

        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            setMainImage(selectedFile);
            setMainImagePreview(previewUrl);
            const info = { name: selectedFile.name, size: selectedFile.size, type: selectedFile.type };
            setMainImageInfo(info);

            onMainImageSelect(selectedFile, previewUrl, info);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;

        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);  
            const fileSize = selectedFile.size; 
            setUploadedFile(selectedFile);
            setUploadedFilePreview(previewUrl);
            const info = { name: selectedFile.name, size: selectedFile.size, type: selectedFile.type };
            setUploadedFileInfo(info);

            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    setIsUploaded(true);
                }
            }, 200); 

            onFileUpload(selectedFile, previewUrl, fileSize);
        }
    };

    const handleOtherImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;

        if (selectedFiles) {
            const fileList = Array.from(selectedFiles);
            const newPreviews: string[] = [];
            const newFileInfos: FileInfo[] = [];

            fileList.forEach(selectedFile => {
                try {
                    const previewUrl = URL.createObjectURL(selectedFile);
                    newPreviews.push(previewUrl);
                    newFileInfos.push({ name: selectedFile.name, size: selectedFile.size, type: selectedFile.type });
                } catch (error) {
                    console.error("Error creating preview URL:", error);
                }
            });


            setOtherFiles(prevFiles => [...prevFiles, ...fileList]);
            setOtherPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
            setOtherFileInfos(prevFileInfos => [...prevFileInfos, ...newFileInfos]);

            if (onOtherImagesSelect) {
                onOtherImagesSelect([...otherFiles, ...fileList] as unknown as FileList, [...otherPreviews, ...newPreviews], [...otherFileInfos, ...newFileInfos]);
            }
        }
    };

    const handleRemoveMainImage = () => {
        setMainImage(null);
        setMainImagePreview(null);
        setMainImageInfo(null);
        onMainImageSelect(null, null, null);
    };

    const handleRemoveUploadedFile = () => {
        setUploadedFile(null);
        setUploadedFilePreview(null);
        setUploadedFileInfo(null);
        setUploadProgress(0);
        setIsUploaded(false);
        onFileUpload(null, null, null);
    };

    const handleRemoveOtherImage = (index: number) => {
        const updatedFiles = [...otherFiles];
        const updatedPreviews = [...otherPreviews];
        const updatedFileInfos = [...otherFileInfos];

        updatedFiles.splice(index, 1);
        updatedPreviews.splice(index, 1);
        updatedFileInfos.splice(index, 1);

        setOtherFiles(updatedFiles);
        setOtherPreviews(updatedPreviews);
        setOtherFileInfos(updatedFileInfos);

        if (onOtherImagesSelect) {
            onOtherImagesSelect(updatedFiles.length > 0 ? updatedFiles as unknown as FileList : null, updatedPreviews, updatedFileInfos); // Cần ép kiểu về FileList
        }
    };

    return (
        <div className="grid grid-cols-1 mt-5 mx-7">

            {/* Main Image Upload */}
            <label className="uppercase md:text-sm text-xs text-gray-500 font-semibold mb-1">
                Main Image
            </label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
                    {/* ... (Icon and text) */}
                    <div className="flex flex-col items-center justify-center pt-7">
                        {/* ... (Icon and text - can be customized) */}
                        <p className="text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                            Chọn ảnh chính
                        </p>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleMainImageChange} />
                </label>
            </div>
            {mainImage && (
                <div className="mt-5 mx-7">
                    <div className="flex items-center justify-between">
                        <h2 className="text-gray-600 font-semibold">Main Image:</h2>
                        <IoClose className="text-2xl cursor-pointer" onClick={handleRemoveMainImage} />
                    </div>
                    {mainImagePreview && (
                        <img src={mainImagePreview} alt={mainImageInfo?.name || "Main Image Preview"} className="mt-2 w-32 h-32 object-cover" />
                    )}
                    {/* <p><strong>Name:</strong> {mainImageInfo?.name}</p>
                    <p><strong>Size:</strong> {Math.round((mainImageInfo?.size || 0) / 1024)} KB</p>
                    <p><strong>Type:</strong> {mainImageInfo?.type}</p> */}
                </div>
            )}


            {/* File Upload */}
            <label className="uppercase md:text-sm text-xs text-gray-500 font-semibold mb-1">
                File Upload (PDF, PPT, ZIP, RAR)
            </label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
                    {/* ... (Icon and text) */}
                    <div className="flex flex-col items-center justify-center pt-7">
                        {/* ... (Icon and text - can be customized) */}
                        <p className="text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                            Chọn file
                        </p>
                    </div>
                    <input type="file" accept=".pdf, .pptx, .ppt, .zip, .rar" className="hidden" onChange={handleFileUpload} />
                </label>
            </div>

            {uploadedFile && !isUploaded && (
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

            {isUploaded && uploadedFile && uploadedFileInfo && (
                <div className="mt-5 mx-7">
                    <div className="flex items-center justify-between">
                        <h2 className="text-gray-600 font-semibold">Uploaded File:</h2>
                        <IoClose className="text-2xl cursor-pointer" onClick={handleRemoveUploadedFile} />
                    </div>
                    <div className="flex items-center"> {/* Sử dụng flex để căn chỉnh icon và thông tin */}
                        {/* Icon tùy thuộc vào loại file */}
                        {uploadedFileInfo.type.includes("pdf") && <i className="fas fa-file-pdf text-2xl mr-2"></i>}
                        {uploadedFileInfo.type.includes("powerpoint") && <i className="fas fa-file-powerpoint text-2xl mr-2"></i>}
                        {uploadedFileInfo.type.includes("zip") || uploadedFileInfo.type.includes("rar") && <i className="fas fa-file-archive text-2xl mr-2"></i>}
                        {/* ... các icon khác */}
                        {!uploadedFileInfo.type.includes("pdf") && !uploadedFileInfo.type.includes("powerpoint") && !uploadedFileInfo.type.includes("zip") && !uploadedFileInfo.type.includes("rar") && <i className="fas fa-file text-2xl mr-2"></i>}

                        {/* <div>
                            <p><strong>Name:</strong> {uploadedFileInfo.name}</p>
                            <p><strong>Size:</strong> {Math.round(uploadedFileInfo.size / 1024)} KB</p>
                            <p><strong>Type:</strong> {uploadedFileInfo.type}</p>
                        </div> */}
                    </div>

                    {/* Preview cho PDF */}
                    {uploadedFileInfo.type.includes("pdf") && uploadedFilePreview && (
                        <div className="mt-2 w-full max-w-full h-64 overflow-hidden border border-gray-300 rounded-md">
                            <iframe src={uploadedFilePreview} title="PDF Preview" className="w-full h-full"></iframe>
                        </div>
                    )}
                </div>
            )}

            <label className="uppercase md:text-sm text-xs text-gray-500 font-light font-semibold mb-1">
                Upload Other Images
            </label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
                    <div className="flex flex-col items-center justify-center pt-7">
                        {/* ... (Icon and text - can be customized) */}
                        <p className="text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                            Chọn ảnh phụ
                        </p>
                    </div>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleOtherImagesChange} />

                </label>
            </div>

            {otherFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 max-h-[200px] overflow-auto">
                    {otherPreviews.map((preview, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <img src={preview} alt={`Image ${index + 1}`} className="w-16 h-16 object-cover mr-2" />
                            <div className="flex flex-col">
                                <p className="text-gray-600 font-semibold">{otherFileInfos[index].name}</p>
                                <p className="text-gray-500 text-xs">{Math.round(otherFileInfos[index].size / 1024)} KB</p>
                            </div>
                            <IoClose className="text-2xl ml-auto cursor-pointer" onClick={() => handleRemoveOtherImage(index)} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UploadPhoto;