"use client";
import { useEffect } from 'react';

export default function OpenAppLink() {
    useEffect(() => {
        // Set a flag to track if the app opened
        let appOpened = false;
    
        // Set a timeout to redirect to fallback if the app isn't installed
        const timeout = setTimeout(() => {
            if (!appOpened) {
                window.location.href = '/fallback';
            }
        }, 2500); // Adjust delay as needed (slightly longer for better reliability)
    
        try {
            // Create an iframe to try to open the app via deep link
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = 'com.awesomeproject.mainactivity://page';
            document.body.appendChild(iframe);
    
            // Clean up iframe after a delay to avoid memory leaks
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000); // Remove iframe after 1 second to give it time to load
        } catch (error) {
            console.error('Failed to create iframe for deep link:', error);
            clearTimeout(timeout);
            window.location.href = '/fallback';
        }
    
        // Detect if the app opened by checking if the page lost focus or visibility
        const handleBlurOrVisibilityChange = () => {
            if (document.visibilityState === 'hidden' || document.hasFocus() === false) {
                appOpened = true;
                clearTimeout(timeout);
                window.location.href = '/';
            }
        };
    
        // Add event listeners for blur and visibility change
        window.addEventListener('blur', handleBlurOrVisibilityChange);
        document.addEventListener('visibilitychange', handleBlurOrVisibilityChange);
    
        // Clean up the event listeners after attempting
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('blur', handleBlurOrVisibilityChange);
            document.removeEventListener('visibilitychange', handleBlurOrVisibilityChange);
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