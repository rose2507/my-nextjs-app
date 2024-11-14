"use client";

export default function Home() {
  const openApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // ป้องกันพฤติกรรมปกติของลิงก์
    const appUrl = "com.awesomeproject.mainactivity://page";
    const fallbackUrl = "/fallback";
    let appOpened = false;

    // ตั้งค่า timeout เพื่อเปลี่ยนไปที่ fallback ถ้าแอปไม่เปิด
    const timeout = setTimeout(() => {
      if (!appOpened) {
        // ถ้าแอปไม่เปิดให้เปลี่ยนไปที่ fallback
        window.location.href = fallbackUrl;
      }
    }, 500); // ตั้งเวลาเป็น ปรับได้ตามต้องการ

    // พยายามเปิดแอปโดยใช้ deep link ผ่าน window.location
    window.location.href = appUrl;

    // ตรวจสอบการเปลี่ยนแปลง visibility หรือ focus ของหน้าเพื่อดูว่าแอปเปิดหรือไม่
    const handlePageChange = () => {
      if (document.visibilityState === "hidden" || document.hasFocus() === false) {
        appOpened = true;
        clearTimeout(timeout); // ยกเลิก timeout
        cleanup(); // ทำความสะอาด
      }
    };

    const cleanup = () => {
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", handlePageChange);
      window.removeEventListener("blur", handlePageChange);
    };

    // เพิ่ม event listeners
    document.addEventListener("visibilitychange", handlePageChange);
    window.addEventListener("blur", handlePageChange);
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
}