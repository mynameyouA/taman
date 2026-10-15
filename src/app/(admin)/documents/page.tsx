"use client";

import React, { useState, useCallback, useRef } from 'react';

interface Document {
  id: string;
  name: string;
  size: string;
  status: 'success' | 'processing' | 'error';
  category: string;
  date: string;
}

export default function AdminDocumentsPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Kinh_Dich_Toan_Tap.pdf',
      size: '12.4 MB',
      status: 'success',
      category: 'Phong Thủy',
      date: '2026-10-08',
    },
    {
      id: '2',
      name: 'Tam_Ly_Hoc_Hanh_Vi.pdf',
      size: '8.1 MB',
      status: 'success',
      category: 'Tâm Lý',
      date: '2026-10-07',
    }
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate Chunking & Embedding process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          
          setDocuments((prevDocs) => [
            {
              id: Math.random().toString(36).substr(2, 9),
              name: file.name,
              size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
              status: 'success',
              category: 'Tài liệu mới',
              date: new Date().toISOString().split('T')[0],
            },
            ...prevDocs,
          ]);
          return 0;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1121] text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col space-y-2">
          <h1 className="text-3xl font-light tracking-wide text-white">
            Learning Studio <span className="text-[#849B87] font-medium">Knowledge Base</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Quản lý và huấn luyện AI với các tài liệu Sách Phong Thủy, Tâm Lý Học.
          </p>
        </header>

        {/* Upload Section */}
        <section 
          className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden
            ${isDragging 
              ? 'border-[#849B87] bg-[#849b87]/10' 
              : 'border-slate-700 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-800/50'
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileInput}
            accept=".pdf,.txt,.docx"
            disabled={isProcessing}
          />
          
          {isProcessing ? (
            <div className="w-full max-w-md space-y-4">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-[#849B87] animate-pulse">Chunking & Embedding...</span>
                <span className="text-slate-400">{progress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#6b7e6d] to-[#849B87] transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">Đang phân tích ngữ nghĩa và tạo vector embeddings.</p>
            </div>
          ) : (
            <div className="space-y-4 pointer-events-none">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-[#849B87]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-200">Kéo thả tài liệu vào đây</h3>
                <p className="text-sm text-slate-400 mt-1">hoặc click để chọn file (PDF, TXT, DOCX)</p>
              </div>
            </div>
          )}
        </section>

        {/* Documents List */}
        <section className="bg-slate-800/30 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 className="text-lg font-medium text-slate-200">Tài liệu đã nạp</h2>
            <div className="flex space-x-2">
              <span className="px-3 py-1 text-xs rounded-full bg-[#849B87]/20 text-[#849B87] border border-[#849B87]/30">
                {documents.length} Files
              </span>
            </div>
          </div>
          
          <div className="divide-y divide-slate-800/50">
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 hover:bg-slate-800/50 transition-colors flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-[#849B87] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-200">{doc.name}</h4>
                    <div className="flex items-center space-x-3 mt-1 text-xs text-slate-500">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.category}</span>
                      <span>•</span>
                      <span>{doc.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="flex items-center text-xs font-medium text-[#849B87] bg-[#849B87]/10 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#849B87] mr-1.5"></span>
                    Ready
                  </span>
                  <button className="text-slate-500 hover:text-slate-300 transition-colors p-2 opacity-0 group-hover:opacity-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            
            {documents.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-sm">
                Chưa có tài liệu nào. Vui lòng upload để bắt đầu.
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
