"use client";
import React from "react";

const appData = [
  {
    appName: "News",
    appId: "5d305031b6f2ee0117cdfef5",
  },
  {
    appName: "PM 2.5",
    appId: "60802b5edd40020203f3cf5b",
  },
  {
    appName: "Myworklist",
    appId: "5e6213890289ad39a0f6aa3c",
  },
];

const Home: React.FC = () => {
  const openApp = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    appUrl: string,
    fallbackUrl: string
  ) => {
    e.preventDefault();

    let appOpened = false;

    window.location.href = appUrl;

    const timeout = setTimeout(() => {
      if (!appOpened) {
        window.location.href = fallbackUrl;
      }
    }, 2000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        appOpened = true;
        clearTimeout(timeout);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
  };

  const uriEncoding = (appId: string): string => {
    const exData = {
      props: {
        toolbar: {
          barStyle: "dark-content",
          backgroundColor: "#ffffff",
          title: "",
          textColor: "#222222",
        },
        value: {
          appId,
          deeplink: {
            testprops: "v1",
          },
        },
        typeKey: "native-app",
        valueType: "deeplink",
      },
    };

    return encodeURIComponent(JSON.stringify(exData));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <a
        href="com.beverestlife.deeplink://page/"
        onClick={(e) =>
          openApp(e, "com.beverestlife.deeplink://page/", "/fallback")
        }
        style={{ color: "red", textDecoration: "underline" }}
      >
        คลิกที่นี่สำหรับเข้าผ่าน Beverest Life (Mobile)
      </a>

      <div className="flex gap-4">
        {appData.map((app) => (
          <a
            key={app.appId}
            href={`com.beverestlife.deeplink://page?data=${uriEncoding(
              app.appId
            )}`}
            onClick={(e) =>
              openApp(
                e,
                `com.beverestlife.deeplink://page?data=${uriEncoding(app.appId)}`,
                "/fallback"
              )
            }
            style={{ color: "red", textDecoration: "underline" }}
          >
            {app.appName}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Home;