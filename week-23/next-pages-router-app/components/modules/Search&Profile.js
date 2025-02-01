import { useState } from "react";
import { useRouter } from "next/router";

import styles from "./Search&Profile.module.css";
import { deleteCookie } from "../../utils/cookie";
import { notify } from "../../utils/helper";
import Image from "next/image";

function SearchProfile({ setProducts, allProducts }) {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const changeHandler = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setProducts(filteredProducts);
  };

  const logoutHandler = () => {
    deleteCookie("token");
    router.replace("/login");
    notify("info", "!از پنل مدیریت خارج شدید");
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.profile}>
        <div>
          <span>
            <span>مدیر</span>
          </span>
          <button onClick={logoutHandler} className={styles.logout}>
            خروج
          </button>
        </div>
        <img src="/images/user.png" alt="profile" width={20} height={20} />
      </div>
      <input
        type="text"
        placeholder="جستجو کالا"
        value={searchValue}
        onChange={changeHandler}
      />
      <Image
        src="/images/search-normal.png"
        alt="search"
        width={20}
        height={20}
      />
    </div>
  );
}

export default SearchProfile;
