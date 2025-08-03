import React, { useState, useRef, useCallback } from "react";
import { Upload, CheckCircle, XCircle, X, MessageSquare } from "lucide-react";
import { UploadedFile } from "../types";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../utils/translations";

interface FileUploadProps {
  onInteractWithDocs: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onInteractWithDocs }) => {
  const { language } = useLanguage();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const processFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "uploading",
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((f) => {
            if (f.id === file.id) {
              const newProgress = Math.min(
                f.progress + Math.random() * 30,
                100
              );
              const newStatus = newProgress === 100 ? "completed" : "uploading";

              if (newStatus === "completed") {
                clearInterval(interval);
              }

              return { ...f, progress: newProgress, status: newStatus };
            }
            return f;
          })
        );
      }, 200);
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        processFiles(droppedFiles);
      }
    },
    [processFiles]
  );

  const handleFileSelect = useCallback(() => {
    if (fileInputRef.current?.files) {
      processFiles(fileInputRef.current.files);
    }
  }, [processFiles]);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((file) => file.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((file) => file.id !== id);
    });
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };


  const completedFiles = files.filter((file) => file.status === "completed");
  const hasCompletedFiles = completedFiles.length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {getTranslation(language, "upload.title")}
        </h2>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 mb-6 ${
            isDragOver
              ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center space-y-6">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300 ${
                isDragOver
                  ? "bg-blue-100 dark:bg-blue-800"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              <Upload
                className={`w-10 h-10 transition-colors duration-300 ${
                  isDragOver
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              />
            </div>

            <div className="space-y-3">
              <p className="text-xl font-medium text-gray-900 dark:text-white">
                {getTranslation(language, "upload.dragDrop")}
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-lg">
                {getTranslation(language, "upload.selectFiles")}
              </button>
            </div>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-4 mb-6">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center flex-1 min-w-0 space-x-4">
                  {/* PDF preview */}
                  {file.preview && file.type === "application/pdf" && (
                    // Show a small embedded PDF preview (adjust size as you like)
                    <embed
                      src={file.preview}
                      type="application/pdf"
                      width="80"
                      height="100"
                      className="rounded-lg border"
                    />
                  )}

                  {/* Fallback icon */}
                  {!file.preview && <span className="text-2xl">📄</span>}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Progress Bar */}
                  {file.status === "uploading" && (
                    <div className="w-32">
                      <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                        {Math.round(file.progress)}%
                      </p>
                    </div>
                  )}

                  {/* Status Icon */}
                  {file.status === "completed" && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                  {file.status === "error" && (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interact with Docs Button */}
        {hasCompletedFiles && (
          <div className="text-center">
            <button
              onClick={onInteractWithDocs}
              className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <MessageSquare className="w-6 h-6 mr-3" />
              Interact with Docs
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              Start chatting with AI about your uploaded files
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
