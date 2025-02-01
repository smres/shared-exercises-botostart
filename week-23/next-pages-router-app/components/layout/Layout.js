import Link from "next/link";
import styles from "./Layout.module.css";

import { getCookie } from "../../utils/cookie";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.right}>
          {getCookie("token") ? (
            <p>پنل کاربـری</p>
          ) : (
            <Link href="/login">
              <div>
                <img src="/images/login.png" alt="Login" />
                <p>ثبت نام / ورود</p>
              </div>
            </Link>
          )}
        </div>
        <div className={styles.left}>
          <Link href="/cart">
            <img src="/images/online-shopping.png" alt="Cart" />
            <p>فروشــگاه</p>
          </Link>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>
          Designed & Developed by
          <a className={styles.ancher} href="https://github.com/smres" target="_blank">
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
