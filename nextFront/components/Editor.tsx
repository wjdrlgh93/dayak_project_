"use client";
import React, { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import api from '@/util/api';

const ReactQuill = dynamic(async () => {
  const { default: RQ } = await import('react-quill-new');
  return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
}, { ssr: false });

export default function Editor({ value, onChange }: any) {
  const quillRef = useRef<any>(null);
  
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file); 

        try {
          
          const res = await api.post('/api/board/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          
          const imgUrl = res.data; 

          if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();

            
            const finalUrl = imgUrl.startsWith('http') 
              ? imgUrl 
              : `${IMAGE_BASE_URL}${imgUrl}`;

            quill.insertEmbed(range.index, 'image', finalUrl);
          }
        } catch (error: any) {
          console.error('이미지 업로드 실패:', error);
          alert("이미지 업로드 중 오류가 발생했습니다.");
        }
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['link', 'image'],
      ],
      handlers: { image: imageHandler },
    },
  }), []);

  return (
    <div style={{ height: '400px', marginBottom: '50px' }}>
      <ReactQuill
        forwardedRef={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        style={{ height: '350px' }}
      />
    </div>
  );
}