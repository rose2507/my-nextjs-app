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
        href="com.beverestlife.deeplink://page?data=%20%7B%22props%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22toolbar%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22barStyle%22%3A%20%22dark-content%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%22%23ffffff%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22title%22%3A%20%22%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22textColor%22%3A%20%22%23222222%22%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%22value%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22appId%22%3A%20%225d305031b6f2ee0117cdfef5%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22itemId%22%3A%20%226711ddcfdf9c0d0012fad9f3%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22deeplink%22%3A%20%22%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AD%E0%B8%A2%E0%B8%B9%E0%B9%88%E0%B9%83%E0%B8%99%E0%B8%99%E0%B8%B5%E0%B9%89%20%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%97%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%AB%E0%B8%A1%E0%B8%94%22%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%22typeKey%22%3A%20%22native-app%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22valueType%22%3A%20%22deeplink%22%0A%20%20%20%20%20%20%20%20%7D%0A%7D"
        target="_blank"
        style={{ color: "red", textDecoration: "underline" }}
      >
        คลิกที่นี่สำหรับเข้าผ่าน Beverest Life (News)
      </a>
    </div>
  );
};

export default Home;