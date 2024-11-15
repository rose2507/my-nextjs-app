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
        href="com.beverestlife.deeplink://page?data=%7B%0A%22props%22%3A%7B%0A%22toolbar%22%3A%7B%0A%22barStyle%22%3A%22dark-content%22%2C%0A%22backgroundColor%22%3A%22%23ffffff%22%2C%0A%22title%22%3A%22%22%2C%0A%22textColor%22%3A%22%23222222%22%0A%7D%2C%0A%22value%22%3A%225d305031b6f2ee0117cdfef5.6711ddcfdf9c0d0012fad9f3%22%2C%0A%22type_key%22%3A%22native-app%22%2C%0A%22value_type%22%3A%22deeplink%22%0A%7D%0A%7D"
        target="_blank"
        style={{ color: "red", textDecoration: "underline" }}
      >
        คลิกที่นี่สำหรับเข้าผ่าน Beverest Life (News)
      </a>
    </div>
  );
};

export default Home;