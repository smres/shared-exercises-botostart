import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const clickHandler = () => {
    // Logging proccess successfull

    router.replace("/students");
  };
  return (
    <div className={styles.container}>
      <h1>Matrixstartup.ir</h1>
      <ul>
        <li>
          <Link href="/courses">Go to course page</Link>
        </li>
        <li>
          <Link href="/users">Go to users page</Link>
        </li>
        <li>
          <button onClick={clickHandler}>LogIn</button>
        </li>
      </ul>
    </div>
  );
}
