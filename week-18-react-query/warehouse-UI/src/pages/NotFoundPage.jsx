import { useNavigate } from "react-router-dom";

import notFound from "../assets/404.webp";

import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h1>صفحه مورد نظر پیدا نشد</h1>
        <button className={styles.button} onClick={() => navigate("/")}>
          بازگشت به صفحه اصلی
        </button>
      </div>
      <img src={notFound} alt="notFound" />
    </div>
  );
}

export default NotFoundPage;
