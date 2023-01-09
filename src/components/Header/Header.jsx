import styles from "./Header.module.css";
import LOGO from "../../imgs/logo.png";

const Header = ({ setCount, removeMap }) => {
  function onClick(e) {
    const tag = e.currentTarget;
    tag.parentNode.childNodes.forEach((item) => {
      if (item.innerText === tag.innerText) {
        item.style.color = "red";
        item.style.textDecoration = "underline";
      } else {
        item.style.color = "black";
        item.style.textDecoration = "none";
      }
    });

    if (tag.innerText === "층별 안내") {
      setCount(2);
    } else {
      setCount(tag.innerText === "메인 페이지" ? 1 : 3);
      removeMap();
    }
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={LOGO} alt="logo" className={styles.logoImg}></img>
      </div>
      <ul className={styles.menu}>
        <li className={styles.menuItem} onClick={onClick}>
          메인 페이지
        </li>
        <li className={styles.menuItem} onClick={onClick}>
          층별 안내
        </li>
        <li className={styles.menuItem} onClick={onClick}>
          오시는길
        </li>
      </ul>
    </div>
  );
};

export default Header;
