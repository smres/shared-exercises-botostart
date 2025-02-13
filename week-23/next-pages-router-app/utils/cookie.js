import {
  setCookie as setCookieNext,
  getCookie as getCookieNext,
  deleteCookie as deleteCookieNext,
} from "cookies-next";

// تابع ست کردن کوکی
const setCookie = (name, value) => {
  setCookieNext(name, value, {
    maxAge: 30 * 24 * 60 * 60, // زمان انقضا ۱ روز
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production", // در production فقط روی HTTPS
    path: "/", // در دسترس در تمام سایت
  });
};

// تابع دریافت مقدار کوکی
const getCookie = (name) => {
  if (typeof window !== "undefined") {
    const value = getCookieNext(name);
    return value ? value : null; // اگر مقدار کوکی وجود داشته باشه، اون رو برمی‌گردونه
  }
};

const deleteCookie = (name) => {
  if (typeof window !== "undefined") {
    deleteCookieNext(name, { path: "/" });
  }
};
export { setCookie, getCookie, deleteCookie };

// =================================================

// export function getCookie(name) {
//   if (typeof document === "undefined") {
//     return null;
//   }

//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     return parts.pop()?.split(";").shift() || null;
//   }
//   return null;
// }

// export function setCookie(name, value) {
//   const date = new Date();
//   date.setTime(date.getTime() + 30 * 24 * 60 * 60);
//   const expires = `expires=${date.toUTCString()}`;
//   document.cookie = `${name}=${value}; ${expires}; path=/`;
// }

// export function deleteCookie(name) {
//   const date = new Date();

//   const expires = `expires=${date.toUTCString()}`;

//   document.cookie = name + `=; Path=/; Expires=${expires}`;
// }
