// src/app/open-app/page.tsx
"use client";
import { useEffect } from 'react';

export default function OpenAppLink() {
    useEffect(() => {
        // Set a timeout to redirect to fallback if the app isn't installed
        const timeout = setTimeout(() => {
            // Redirect to the fallback URL if the app is not found
            window.location.href = '/fallback';
        }, 2000); // Adjust delay as needed
    
        // Create an iframe to try to open the app via deep link
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = 'com.awesomeproject.mainactivity://page';
        document.body.appendChild(iframe);
    
        // Clear the timeout and redirect to the home page if the app opens (detected by page losing focus)
        const handleBlur = () => {
            clearTimeout(timeout);
            window.location.href = '/';
        };
        
        window.addEventListener('blur', handleBlur);
    
        // Clean up the iframe and event listener after attempting
        return () => {
            clearTimeout(timeout);
            document.body.removeChild(iframe);
            window.removeEventListener('blur', handleBlur);
        };
    }, []);

    return (
        <div className="text-center py-5">
            <h1 className="text-xl font-bold mb-3">กำลังเปิดแอป...</h1>
            <p>
                หากแอปไม่เปิดอัตโนมัติ{' '}
                <a href="com.awesomeproject.mainactivity://page" className="text-blue-500 underline">คลิกที่นี่</a>
            </p>
        </div>
    );
}