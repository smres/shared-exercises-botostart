import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Search&Profile.module.css";

import profile from "../assets/profile.svg";
import { deleteCookie } from "../utils/cookie";
import { notify } from "../utils/helper";
import { useLocalStorage } from "../hooks/useLocalStorage";

function SearchProfile({ setProducts, allProducts }) {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useLocalStorage("profileInfo", {});

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
    navigate("/login");
    notify("info", "!از پنل مدیریت خارج شدید");
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.profile}>
        <div>
          <span>
            <span>Admin</span> - <h5>{profileInfo.username}</h5>
          </span>
          <button onClick={logoutHandler} className={styles.logout}>
            خروج
          </button>
        </div>
        <img src={profile} alt="profile" />
      </div>
      <input
        type="text"
        placeholder="جستجو کالا"
        value={searchValue}
        onChange={changeHandler}
      />
    </div>
  );
}

export default SearchProfile;
