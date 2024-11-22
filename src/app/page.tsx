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
const appDataPRD = [
  // {
  //   appName: "Approval",
  //   appId: "6156e7cf4c578300132d2d9d",
  // },
  {
    appName: "Approval (Dev)",
    appId: "614c5e3077eb0c0012be032d",
  },
  {
    appName: "Approval (UAT)",
    appId: "61543d54f03d4600122f9349",
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
          deeplink: encodeURIComponent(
            JSON.stringify({
              testprops: "v1",
              testprops2: "props2",
            })
          ),
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
      <div>{"UAT App"}</div>
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
                `com.beverestlife.deeplink://page?data=${uriEncoding(
                  app.appId
                )}`,
                "/fallback"
              )
            }
            style={{ color: "red", textDecoration: "underline" }}
          >
            {app.appName}
          </a>
        ))}
      </div>
      <div>{"Production App"}</div>
      <div className="flex gap-4">
        {appDataPRD.map((app) => (
          <a
            key={app.appId}
            href={`com.beverestlife.deeplink://page?data=${uriEncoding(
              app.appId
            )}`}
            onClick={(e) =>
              openApp(
                e,
                `com.beverestlife.deeplink://page?data=${uriEncoding(
                  app.appId
                )}`,
                "/fallback"
              )
            }
            style={{ color: "red", textDecoration: "underline" }}
          >
            {app.appName}
          </a>
        ))}
      </div>
      <div className="flex gap-4">
      <a
        href="com.beverestlife.deeplink://page?data=%7B%22props%22%3A%7B%22toolbar%22%3A%7B%22barStyle%22%3A%22dark-content%22%2C%22backgroundColor%22%3A%22%23ffffff%22%2C%22title%22%3A%22%22%2C%22textColor%22%3A%22%23222222%22%7D%2C%22value%22%3A%7B%22appId%22%3A%22614c5e3077eb0c0012be032d%22%2C%22deeplink%22%3A%22%257B%2522testprops%2522%253A%2522v1%2522%252C%2522testprops2%2522%253A%2522props2%2522%257D%22%7D%2C%22typeKey%22%3A%22native-app%22%2C%22valueType%22%3A%22deeplink%22%7D%7D"
        onClick={(e) =>
          openApp(e, "com.beverestlife.deeplink://page?data=%7B%22props%22%3A%7B%22toolbar%22%3A%7B%22barStyle%22%3A%22dark-content%22%2C%22backgroundColor%22%3A%22%23ffffff%22%2C%22title%22%3A%22%22%2C%22textColor%22%3A%22%23222222%22%7D%2C%22value%22%3A%7B%22appId%22%3A%22614c5e3077eb0c0012be032d%22%2C%22deeplink%22%3A%22%257B%2522testprops%2522%253A%2522v1%2522%252C%2522testprops2%2522%253A%2522props2%2522%257D%22%7D%2C%22typeKey%22%3A%22native-app%22%2C%22valueType%22%3A%22deeplink%22%7D%7D", "/fallback")
        }
        style={{ color: "red", textDecoration: "underline" }}
      >
        Approval 
      </a>
      </div>
    </div>
  );
};

export default Home;
