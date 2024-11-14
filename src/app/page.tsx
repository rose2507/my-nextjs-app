"use client";
import React from "react";

const Home: React.FC = () => {
  const openApp = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const appUrl1 = "com.awesomeproject.mainactivity://page/";
    const appUrl2 = "com.beverestlife.deeplink://page/";
    const fallbackUrl = "/fallback";
    let appOpened = false;

    // Function to attempt to open a deep link
    const tryDeepLink = (url: string, nextCallback: () => void) => {
      const timeout = setTimeout(() => {
        if (!appOpened) {
          nextCallback(); // Try the next link or go to fallback if not supported
        }
      }, 1000); // Adjust timeout as needed

      // Attempt to open the app using the deep link
      window.location.href = url;

      // Check if the page loses focus to determine if the app opened
      const handleBlur = () => {
        appOpened = true;
        clearTimeout(timeout); // Clear the timeout if the app opened
        cleanup(); // Clean up event listeners
      };

      const cleanup = () => {
        clearTimeout(timeout);
        window.removeEventListener("blur", handleBlur);
      };

      // Add event listener to detect if the app opened
      window.addEventListener("blur", handleBlur);
    };

    // Try the first deep link, then the second if the first fails
    tryDeepLink(appUrl1, () => {
      tryDeepLink(appUrl2, () => {
        // If neither deep link opens the app, redirect to the fallback page
        if (!appOpened) {
          window.location.href = fallbackUrl;
        }
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <a
        href="#"
        onClick={openApp}
        style={{ color: "red", textDecoration: "underline" }}
      >
        คลิกที่นี่สำหรับเข้าผ่าน Beverest Life (Mobile)
      </a>
    </div>
  );
};

export default Home;