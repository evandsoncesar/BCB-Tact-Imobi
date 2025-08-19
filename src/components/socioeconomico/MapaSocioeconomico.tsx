import React, { useState, useEffect } from "react";
import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { LayerProps } from "react-map-gl";

const choroplethLayer: LayerProps = {
  id: "municipios-populacao",
  type: "fill",
  source: "municipios",
  paint: {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "a_resultados__series__serie__2022"],
      180000,
      "#d4f0a0",
      230000,
      "#f0e68c",
      270000,
      "#ffa500",
      310000,
      "#ff4500",
      360000,
      "#8b0000",
    ],
    "fill-opacity": 0.7,
    "fill-outline-color": "#333",
  },
};

export default function MapaSocioeconomico() {
  const [viewState, setViewState] = useState({
    longitude: -46.63,
    latitude: -23.55,
    zoom: 8,
  });

  const [geojson, setGeojson] = useState<any>(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/municipios_sp.geojson") // <-- Caminho correto
      .then((res) => res.json())
      .then((data) => {
        console.log("GeoJSON carregado:", data);
        setGeojson(data);
      })
      .catch((err) => console.error("Erro ao carregar GeoJSON:", err));
  }, []);

  return (
    <div style={{ width: "150%", height: "70vh" }}>
      <Map
        {...viewState}
        mapboxAccessToken="pk.eyJ1IjoiZXZhbmRzb25jZXNhciIsImEiOiJjbWN3YXNtMjkwMGl2Mm5wd21mdGRlazA0In0.bvgSecEoO0w-PDKVfkcpjQ"
        mapStyle="mapbox://styles/mapbox/light-v10"
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
      >
        {geojson && (
          <Source id="municipios" type="geojson" data={geojson}>
            <Layer {...choroplethLayer} />
          </Source>
        )}
      </Map>
    </div>
  );
}
