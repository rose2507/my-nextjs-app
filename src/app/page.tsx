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
      // Set a longer timeout to allow the app enough time to open
      const timeout = setTimeout(() => {
        if (!appOpened) {
          nextCallback(); // Try the next link or go to fallback if not supported
        }
      }, 2000); // Increase the timeout duration as needed

      // Attempt to open the app using the deep link
      window.location.href = url;

      // Detect if the page visibility changes (i.e., the app is opened)
      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          appOpened = true;
          clearTimeout(timeout); // Clear the timeout if the app opened
          cleanup(); // Clean up event listeners
        }
      };

      const cleanup = () => {
        clearTimeout(timeout);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };

      // Add event listener to detect if the app opened
      document.addEventListener("visibilitychange", handleVisibilityChange);
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
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
    <a
      href="#"
      onClick={openApp}
      style={{ color: "red", textDecoration: "underline" }}
    >
      คลิกที่นี่สำหรับเข้าผ่าน Beverest Life (Mobile)
    </a>
    <a
      href="myapp://example.com"
      style={{ color: "red", textDecoration: "underline" }}
    >
      คลิกที่นี่สำหรับเข้าผ่าน Beverest Life (Mobile 2)
    </a>
  </div>
  );
};

export default Home;