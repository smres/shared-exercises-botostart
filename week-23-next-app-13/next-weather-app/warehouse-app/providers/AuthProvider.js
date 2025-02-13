"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "../utils/cookie";

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("token");

    if (!token) {
      router.replace("/login");
    } else {
      router.replace("/profile");
    }

    setLoading(false);
  }, []);

  if (loading) return null; // جلوگیری از نمایش محتوای صفحه قبل از بررسی احراز هویت

  return <>{children}</>;
};

export default AuthProvider;
