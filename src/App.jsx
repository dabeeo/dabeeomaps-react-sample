import "./App.css";
import { Maps } from "dabeeomaps";
import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Main from "./components/Main/Main";
import Loading from "./components/Loading/Loading";

/**
 * 여러 지도를 관리하기 위한 Maps Instance 생성
 * Maps Instance는 가비지 컬렉터에 의해 해제되지 않음.
 * 프로젝트 당 한개의 객체만 존재해야하기 때문에 외부에서 단 한번만 호출되게 사용해야 함.
 */
export const dabeeoMaps = new Maps();

/**
 * 지도를 표시하기 위한 지도 정보 가져오기.
 * mapData 또한 가비지 컬렉터에 의해 해제되지 않음.
 * 프로젝트 당 한개의 객체만 존재해야하기 때문에 외부에서 단 한번만 호출되게 사용해야 함.
 */
export const mapData = await dabeeoMaps.getMapData({
  clientId: "byQdkBiK4_qbW3lNRooB_Q",
  clientSecret: "2e77b65e659705891c0ca2e66d74e285",
});


function App() {
  const [map, setMap] = useState(null);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
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
