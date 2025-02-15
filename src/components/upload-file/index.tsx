import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";

interface FileInfo {
    name: string;
    size: number;
    type: string;
}

interface UploadPhotoProps {
    onMainImageSelect: (file: File | null, filePreview: string | null, fileInfo: FileInfo | null) => void;
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
        <div className="grid grid-cols-1 mt-5 mx-7 gap-y-4">
            <label className="uppercase md:text-sm text-xs text-gray-500 font-semibold mb-1">
                Ảnh bìa
            </label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
                    <div className="flex flex-col items-center justify-center pt-7">
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


            <label className="uppercase md:text-sm text-xs text-gray-500 font-semibold mb-1">
                Ảnh minh họa khác
            </label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
                    <div className="flex flex-col items-center justify-center pt-7">
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

            {/* File Upload */}
            <label className="uppercase md:text-sm text-xs text-gray-500 font-semibold mb-1">
                File tải lên (PDF, PPT, ZIP, RAR)
            </label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
                    <div className="flex flex-col items-center justify-center pt-7">
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

            {isUploaded && uploadedFile && uploadedFileInfo &&
                ["pdf", "ppt", "pptx"].some(type => uploadedFileInfo.type.includes(type)) && (
                    <div className="mt-5 mx-7">
                        <div className="flex items-center justify-between">
                            <h2 className="text-gray-600 font-semibold">Uploaded File:</h2>
                            <IoClose className="text-2xl cursor-pointer" onClick={handleRemoveUploadedFile} />
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                {uploadedFileInfo.type.includes("pdf") && <i className="fas fa-file-pdf text-2xl mr-2"></i>}
                                {(uploadedFileInfo.type.includes("ppt") || uploadedFileInfo.type.includes("pptx")) && <i className="fas fa-file-powerpoint text-2xl mr-2"></i>}
                            </div>
                        </div>

                        {/* Preview cho PDF */}
                        {uploadedFileInfo.type.includes("pdf") && uploadedFilePreview && (
                            <div className="mt-2 w-full max-w-full h-64 overflow-hidden border border-gray-300 rounded-md">
                                <iframe src={uploadedFilePreview} title="PDF Preview" className="w-full h-full"></iframe>
                            </div>
                        )}

                        {/* Preview cho PowerPoint */}
                        {(uploadedFileInfo.type.includes("ppt") || uploadedFileInfo.type.includes("pptx")) && uploadedFilePreview && (
                            <div className="mt-2 w-full max-w-full h-64 overflow-hidden border border-gray-300 rounded-md">
                                <iframe
                                    src={`https://docs.google.com/gview?url=${uploadedFilePreview}&embedded=true`}
                                    title="PPT Preview"
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        )}
                    </div>
                )}

        </div>
    );
};

export default UploadPhoto;