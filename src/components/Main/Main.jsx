import styles from "./Main.module.css";
import SECOND from "../../imgs/main2.jpg";

const Main = ({ count }) => {
  return (
    <div className={styles.main}>
      {count === 1 && (
        <img className={styles.second} src={SECOND} alt="second"></img>
      )}
    </div>
  );
};

export default Main;
