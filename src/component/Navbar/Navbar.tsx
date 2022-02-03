import { useState } from "react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [searchParams, setSearchParams] = useState<string>("");
  const authToken: string | null = window.sessionStorage.getItem("auth-token");

  return (
    <div className={styles.Navbar}>
      <div className={styles.Logo}>MOVIE.DB</div>
      <form className={styles.Search}>
        <svg
          width="801"
          height="801"
          viewBox="0 0 801 801"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M797.6 742.5L537.9 482.8C578.2 430.7 600 367 600 300C600 219.8 568.7 144.6 512.1 87.9C455.5 31.2 380.1 0 300 0C219.9 0 144.5 31.3 87.9 87.9C31.2 144.5 0 219.8 0 300C0 380.1 31.3 455.5 87.9 512.1C144.5 568.8 219.8 600 300 600C367 600 430.6 578.2 482.7 538L742.4 797.6C743.162 798.362 744.066 798.966 745.061 799.379C746.056 799.791 747.123 800.003 748.2 800.003C749.277 800.003 750.344 799.791 751.339 799.379C752.334 798.966 753.238 798.362 754 797.6L797.6 754.1C798.362 753.338 798.966 752.434 799.379 751.439C799.791 750.444 800.003 749.377 800.003 748.3C800.003 747.223 799.791 746.156 799.379 745.161C798.966 744.166 798.362 743.262 797.6 742.5V742.5ZM458.4 458.4C416 500.7 359.8 524 300 524C240.2 524 184 500.7 141.6 458.4C99.3 416 76 359.8 76 300C76 240.2 99.3 183.9 141.6 141.6C184 99.3 240.2 76 300 76C359.8 76 416.1 99.2 458.4 141.6C500.7 184 524 240.2 524 300C524 359.8 500.7 416.1 458.4 458.4Z"
            fill="grey"
          />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          id="searchname"
          onChange={(event) => setSearchParams(event?.target.value)}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              window.location.href = `/search?name=${searchParams}`;
            }
          }}
        />
        <input style={{ display: "none" }} />
      </form>
      <div className={styles.TextContainer}>
        <a href="/">Home</a>
        <a href="/wishlist">Wishlist</a>
        {authToken ? (
          <a
            onClick={() => {
              window.sessionStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </a>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
