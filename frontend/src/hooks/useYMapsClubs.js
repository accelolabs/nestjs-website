import { useEffect, useState, useCallback, useRef } from "react";

const YMAPS_SCRIPT_ID = "ymaps-script";

export function useYMapsClubs(mapContainerRef, clubs = [], options = {}, onSelectClub) {
  const [placemarks, setPlacemarks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    let destroyed = false;

    const initMap = async () => {
      if (!window.ymaps || !mapContainerRef.current || mapRef.current || destroyed) return;

      const ymaps = window.ymaps;
      const darkLayerKey = "dark#layer";
      const darkMapTypeKey = "dark#mapType";

      if (ymaps.layer?.storage && !ymaps.layer.storage.get(darkLayerKey)) {
        const DarkLayerConstructor = function () {
          return new ymaps.Layer(
            "https://core-renderer-tiles.maps.yandex.net/tiles?l=map&theme=dark&%c&%l&scale={{ scale }}",
          );
        };
        ymaps.layer.storage.add(darkLayerKey, DarkLayerConstructor);
        const mapType = new ymaps.MapType("Dark Map", [darkLayerKey]);
        ymaps.mapType.storage.add(darkMapTypeKey, mapType);
      }

      const mapOptions = {
        center: options.center || [59.9343, 30.3351],
        zoom: options.zoom || 11,
        controls: options.controls || ["zoomControl", "rulerControl"],
        type: ymaps.mapType.storage.get(darkMapTypeKey) ? darkMapTypeKey : "yandex#map",
      };

      const myMap = new ymaps.Map(mapContainerRef.current, mapOptions);
      mapRef.current = myMap;

      const marks = [];
      for (const club of clubs) {
        const res = await ymaps.geocode(club.address);
        const coords = res.geoObjects.get(0)?.geometry.getCoordinates();
        if (!coords) continue;

        const placemark = new ymaps.Placemark(coords, {
          balloonContent: club.name,
          hintContent: club.address,
        });

        if (onSelectClub) {
          placemark.events.add("click", () => onSelectClub(club));
        }

        myMap.geoObjects.add(placemark);
        marks.push({ ...club, placemark, coords });
      }

      if (!destroyed) {
        setPlacemarks(marks);
        setLoaded(true);
      }
    };

    if (window.ymaps) {
      window.ymaps.ready(initMap);
    } else {
      let script = document.getElementById(YMAPS_SCRIPT_ID);
      if (!script) {
        script = document.createElement("script");
        script.id = YMAPS_SCRIPT_ID;
        script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${import.meta.env.VITE_YMAPS_API_KEY}`;
        script.async = true;
        document.body.appendChild(script);
      }
      script.onload = () => window.ymaps?.ready(initMap);
    }

    return () => {
      destroyed = true;
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
      setLoaded(false);
      setPlacemarks([]);
    };
  }, [mapContainerRef, clubs, options.center, options.zoom, options.controls, onSelectClub]);

  const filterPlacemarks = useCallback(
    (query) => {
      if (!mapRef.current || placemarks.length === 0) return [];

      const q = query.toLowerCase();
      placemarks.forEach((p) => mapRef.current.geoObjects.remove(p.placemark));

      const filtered = placemarks.filter((p) => p.address.toLowerCase().includes(q));
      filtered.forEach((p) => mapRef.current.geoObjects.add(p.placemark));

      if (filtered[0]?.coords) {
        mapRef.current.setCenter(filtered[0].coords, 14);
      }
      return filtered;
    },
    [placemarks],
  );

  return { placemarks, loaded, filterPlacemarks };
}
