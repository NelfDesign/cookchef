import styles from "./Header.module.scss";
import cookchef from "../../assets/images/cookchef.png";
import { useState } from "react";
import HeaderMenu from "./components/HeaderMenu";

function Header({ setPage }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div onClick={() => setPage("homePage")} className="flex-fill">
        <img src={cookchef} alt="logo" />
      </div>
      <ul className={styles.headerList}>
        <button
          onClick={() => setPage("admin")}
          className="btn btn-primary mr-15"
        >
          Ajouter une recette
        </button>
        <button className="mr-5 btn btn-reverse-primary">
          <i className="fa-solid fa-heart mr-5"></i>
          <span>Whishlist</span>
        </button>
        <button className="btn btn-primary">Connexion</button>
      </ul>
      <i
        onClick={() => setShowMenu(true)}
        className={`fa-solid fa-bars ${styles.headerXs}`}
      ></i>
      {showMenu && (
        <>
          <div
            onClick={() => {
              setShowMenu(false);
              setPage("homePage");
            }}
            className="calc"
          ></div>
          <HeaderMenu setPage={setPage} />
        </>
      )}
    </header>
  );
}

export default Header;
