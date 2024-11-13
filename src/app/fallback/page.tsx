"use client";
import React from 'react';

const FallbackPage: React.FC = () => {
  const handleOpenApp = (url: string, fallbackUrl: string): void => {
    window.location.href = url;
    setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 2000); // Delay to give the device a chance to open the app if installed
  };

  return (
    <div className="text-center py-5">
      <h1 className="text-xl font-bold mb-3">{"Download Our App"}</h1>
      <p className="mb-1">{"It looks like you don't have our app installed."}</p>
      <p className="mb-4">{"Get it from the App Store or Google Play below:"}</p>

      <div className="mb-4">
        <a 
          href="#"
          onClick={() => handleOpenApp(
            "thaibevconnect://", 
            "https://apps.apple.com/th/app/beverest-life/id1474953758?l=th"
          )}
          rel="noopener noreferrer"
        >
          <img src="/qrcode_apps.apple.com.webp" alt="Download on the App Store" className="w-36 mx-auto mb-2" />
          <div className="text-sm">{"Open in App or Download on App Store"}</div>
        </a>
      </div>
      
      <div>
        <a 
          href="#"
          onClick={() => handleOpenApp(
            "thaibevconnect://", 
            "https://play.google.com/store/apps/details?id=com.thaibevconnect&hl=th"
          )}
          rel="noopener noreferrer"
        >
          <img src="/qrcode_play.google.com.webp" alt="Get it on Google Play" className="w-36 mx-auto mb-2" />
          <div className="text-sm">{"Open in App or Download on Google Play"}</div>
        </a>
      </div>
    </div>
  );
};

export default FallbackPage;