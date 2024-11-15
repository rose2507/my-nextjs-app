"use client";
import React from "react";

const Home: React.FC = () => {
  const openApp = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const appUrl = "com.beverestlife.deeplink://page/";
    const fallbackUrl = "/fallback";
    let appOpened = false;

    // พยายามเปิดแอป
    window.location.href = appUrl;

    // ตั้งค่า timeout เพื่อเปลี่ยนเส้นทางไปยัง fallback หากแอปไม่ถูกเปิด
    const timeout = setTimeout(() => {
      if (!appOpened) {
        window.location.href = fallbackUrl;
      }
    }, 2000); // ปรับเวลา timeout ตามที่ต้องการ

    // ตรวจจับการเปลี่ยนแปลงของ visibility
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        appOpened = true;
        clearTimeout(timeout); // ล้าง timeout หากแอปเปิดสำเร็จ
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <a
        href="com.beverestlife.deeplink://page/"
        onClick={openApp}
        style={{ color: "red", textDecoration: "underline" }}
      >
        คลิกที่นี่สำหรับเข้าผ่าน Beverest Life (Mobile)
      </a>
      {/* <a
        href="myapp://example.com"
        target="_blank"
        style={{ color: "red", textDecoration: "underline" }}
      >
        คลิกที่นี่สำหรับเข้าผ่าน Beverest Life (Mobile 2)
      </a> */}
    </div>
  );
};

export default Home;