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
  if (typeof window !== undefined) {
    const value = getCookieNext(name);
    return value ? value : null; // اگر مقدار کوکی وجود داشته باشه، اون رو برمی‌گردونه
  }
};

function deleteCookie(name) {
  if (typeof window !== "undefined") {
    removeCookieNext(name, { path: "/" });
  }
}
export { setCookie, getCookie, deleteCookie };
