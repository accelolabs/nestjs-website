import { useEffect, useState, useCallback, useRef } from "react";
import { useMockClubs } from "../hooks/useMockClubs";

export function useYMapsClubs(mapContainerRef, options = {}, onSelectClub) {
  const [placemarks, setPlacemarks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const clubs = useMockClubs();
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      if (!window.ymaps || !mapContainerRef.current || mapRef.current) return;

      const ymaps = window.ymaps;

      const DARK_LAYER_KEY = "dark#layer";
      const DARK_MAP_TYPE_KEY = "dark#mapType";

      if (ymaps.layer?.storage && !ymaps.layer.storage.get(DARK_LAYER_KEY)) {
        const DarkLayerConstructor = function () {
          return new ymaps.Layer(
            "https://core-renderer-tiles.maps.yandex.net/tiles?l=map&theme=dark&%c&%l&scale={{ scale }}"
          );
        };
        ymaps.layer.storage.add(DARK_LAYER_KEY, DarkLayerConstructor);
        const mapType = new ymaps.MapType("Dark Map", [DARK_LAYER_KEY]);
        ymaps.mapType.storage.add(DARK_MAP_TYPE_KEY, mapType);
      }

      const mapOptions = {
        center: options.center || [59.9343, 30.3351],
        zoom: options.zoom || 11,
        controls: options.controls || ["zoomControl", "rulerControl"],
        type: ymaps.mapType.storage.get(DARK_MAP_TYPE_KEY)
          ? DARK_MAP_TYPE_KEY
          : "yandex#map",
      };

      const myMap = new ymaps.Map(mapContainerRef.current, mapOptions);
      mapRef.current = myMap;

      const marks = [];
      for (const club of clubs) {
        const res = await ymaps.geocode(club.address);
        const coords = res.geoObjects.get(0)?.geometry.getCoordinates();
        if (coords) {
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
      }

      setPlacemarks(marks);
      setLoaded(true);
    };

    if (window.ymaps) {
      window.ymaps.ready(initMap);
    } else {
      const script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${import.meta.env.VITE_YMAPS_API_KEY}`;
      script.async = true;
      script.onload = () => window.ymaps.ready(initMap);
      document.body.appendChild(script);
    }
  }, [mapContainerRef, clubs, options.center, options.zoom, options.controls]);

  const filterPlacemarks = useCallback(
    (query) => {
      if (!mapRef.current || placemarks.length === 0) return [];

      const q = query.toLowerCase();
      placemarks.forEach((p) => mapRef.current.geoObjects.remove(p.placemark));

      const filtered = placemarks.filter((p) =>
        p.address.toLowerCase().includes(q)
      );
      filtered.forEach((p) => mapRef.current.geoObjects.add(p.placemark));

      if (filtered[0]?.coords) {
        mapRef.current.setCenter(filtered[0].coords, 14);
      }
      return filtered;
    },
    [placemarks]
  );

  return { mapObj: mapRef.current, placemarks, loaded, filterPlacemarks };
}
