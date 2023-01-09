import "./App.css";
import { Maps } from "dabeeomaps";
import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Main from "./components/Main/Main";
import Loading from "./components/Loading/Loading";

function App() {
  const [map, setMap] = useState(null);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const dabeeoMaps = new Maps();
  /**
   * script은 index.html에 script 등록후 아래 방법으로 사용하시면 됩니다.
   */
  // const dabeeoMaps = new window.dabeeo.Maps();

  const addMap = useCallback(async (parent) => {
    const mapContainer = document.createElement("div");
    mapContainer.style.width = "80%";
    mapContainer.style.height = "100%";
    mapContainer.classList.add("map");
    parent.appendChild(mapContainer);

    setLoading(true);
    const mapData = await dabeeoMaps.getMapData({
      clientId: "byQdkBiK4_qbW3lNRooB_Q",
      clientSecret: "2e77b65e659705891c0ca2e66d74e285",
    });

    const mapOption = {};
    const dabeeoMap = await dabeeoMaps.showMap(
      mapContainer,
      mapOption,
      mapData
    );
    setMap(dabeeoMap);
    setLoading(false);

    return mapData;
  }, []);

  function removeMap() {
    if (map) {
      map.context.cleanup();
      const mapContainer = document.querySelector(".map");
      if (mapContainer.parentNode) {
        mapContainer.parentNode.removeChild(mapContainer);
      }
      setMap(null);
    }
  }

  return (
    <div className="App">
      {loading && <Loading />}
      <Header setCount={setCount} removeMap={removeMap} />
      {count === 2 ? (
        <Map map={map} addMap={addMap} setLoading={setLoading} />
      ) : (
        <Main count={count} />
      )}
    </div>
  );
}

export default App;
