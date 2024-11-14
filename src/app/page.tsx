"use client";

export default function Home() {
  const openApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // ป้องกันพฤติกรรมปกติของลิงก์
    const appUrl1 = "com.awesomeproject.mainactivity://page";
    const appUrl2 = "com.beverestlife.deeplink://page";
    const fallbackUrl = "/fallback";
    let appOpened = false;

    // ฟังก์ชันพยายามเปิด deep link
    const tryDeepLink = (url: string, nextCallback: () => void) => {
      const timeout = setTimeout(() => {
        if (!appOpened) {
          nextCallback(); // เรียก deep link ถัดไปหรือไป fallback ถ้าทั้งหมดไม่สำเร็จ
        }
      }, 500); // ตั้ง timeout ให้เหมาะสมตามต้องการ

      // พยายามเปิดแอปโดยใช้ deep link ผ่าน window.location
      window.location.href = url;

      // ตรวจสอบการเปลี่ยนแปลง visibility หรือ focus ของหน้าเพื่อดูว่าแอปเปิดหรือไม่
      const handlePageChange = () => {
        if (document.visibilityState === "hidden" || document.hasFocus() === false) {
          appOpened = true;
          clearTimeout(timeout); // ยกเลิก timeout ถ้าแอปเปิดแล้ว
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

    // ลองเปิด deep link อันแรก ถ้าไม่สำเร็จให้ลองอันที่สอง
    tryDeepLink(appUrl1, () => {
      // ถ้าอันแรกไม่สำเร็จ ลองอันที่สอง
      tryDeepLink(appUrl2, () => {
        // ถ้าอันที่สองไม่สำเร็จ ให้เปลี่ยนไป fallback
        window.location.href = fallbackUrl;
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
}