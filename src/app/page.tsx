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
      <a
        href="com.beverestlife.deeplink://page?data=%7B%22id%22%3A123%2C%22name%22%3A%22John%20Doe%22%2C%22status%22%3A%22active%22%7D"
        target="_blank"
        style={{ color: "red", textDecoration: "underline" }}
      >
        คลิกที่นี่สำหรับเข้าผ่าน Beverest Life (Mobile with data)
      </a>
    </div>
  );
};

export default Home;