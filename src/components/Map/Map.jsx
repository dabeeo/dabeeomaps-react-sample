import { useEffect, useState } from "react";
import styles from "./Map.module.css";

const Map = ({ map, addMap, setLoading }) => {
  const [floors, setFloors] = useState(null);

  useEffect(() => {
    const viewer = document.getElementById("viewer");
    addMap(viewer).then((e) => {
      setFloors(e.dataFloor.getFloors());
    });
  }, [addMap]);

  useEffect(() => {
    if (floors && map) {
      const floorList = document.getElementById("floorList");
      floors.forEach((floor) => {
        const result = floor.name.find((name) => name.lang === "ko");
        if (result) {
          const item = document.createElement("div");
          item.classList.add("floorItem");
          item.innerText = result.text;

          item.addEventListener("click", async () => {
            setLoading(true);
            await map.context.changeFloor(floor.id);
            setLoading(false);
          });
          floorList.appendChild(item);
        }
      });
    }
  }, [map, floors, setLoading]);

  return (
    <div className={styles.map} id="viewer">
      <div className={styles.floorList} id="floorList"></div>
    </div>
  );
};

export default Map;
