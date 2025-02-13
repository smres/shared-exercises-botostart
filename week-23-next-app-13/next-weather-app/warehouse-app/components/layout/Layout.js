import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Layout.module.css";
import { getCookie } from "../../utils/cookie";

function Layout({ children }) {
  const pathname = usePathname();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          {getCookie("token") ? (
            <Link
              href="/profile"
              className={`nav-link ${pathname === "/profile" ? "active" : ""}`}
            >
              <p>پنل کاربـری</p>
              <img src="/images/user.png" />
            </Link>
          ) : (
            <Link
              href="/login"
              className={`nav-link ${
                pathname === "/login" || pathname === "/registration"
                  ? "active"
                  : ""
              }`}
            >
              <p>ورود | ثبت نام</p>
              <img src="/images/login.png" alt="Login" />
            </Link>
          )}
        </div>
        <div className={styles.right}>
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "active" : ""}`}
          >
            <p>فروشــگاه</p>
            <img src="/images/online-shopping.png" alt="Cart" />
          </Link>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>
          Designed & Developed by
          <a
            className={styles.ancher}
            href="https://github.com/smres"
            target="_blank"
          >
            {" "}
            Seyed Mohammad Reza Esmailzadeh
          </a>{" "}
          &copy; 2025
        </p>
      </footer>
    </>
  );
}

export default Layout;
