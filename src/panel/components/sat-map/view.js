import React, { useEffect, useState } from 'react';

import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import {Vector} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Circle, Fill, Stroke, Style} from 'ol/style';


export default function SatMapView({ machine }) {
  const { latitude, longitude } = machine.state;

  const zoom = 14.5;
  const baseLat = 50.422;
  const baseLng = 29.973;
  const baseCoords = fromLonLat([baseLng, baseLat])
  const view = new View({
    center: baseCoords,
    zoom
  })

  const point = new Point(baseCoords);
  const [geoMarker] = useState(new Feature({
    type: 'geoMarker',
    geometry: point
  }))

  const styles = {
    'geoMarker': new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({color: 'black'}),
        stroke: new Stroke({
          color: 'white', width: 2
        })
      })
    })
  };
  const vectorLayer = new Vector({
    source: new VectorSource({
      features: [geoMarker]
    }),
    style: feature => styles[feature.get('type')],
  });

  const [map] = useState(new Map({
    target: null, // set this in `useEffect`
    layers: [
      new TileLayer({
        source: new OSM()
      }),
      vectorLayer
    ],
    view,
  }));

  useEffect(() => {
    map.setTarget('map');
  }, []);


  useEffect(() => {
    if (latitude && longitude) {
      console.log({latitude,longitude})
      const geometry = geoMarker.getGeometry();
      geometry.setCoordinates(fromLonLat([longitude, latitude]))
    }
    

    /*const baseLat = 50.422;
    const baseLng = 29.973;
    const mLat = 5 / 10;
    const mLng = 8 / 10;
    let x = 0;
    let y = 0;
    const interval = setInterval(() => {
      x += 0.1
      y -= 0.1
      console.log({ x, y })
      const lat = baseLat + x * 0.001 * mLat
      const lng = baseLng + y * 0.001 * mLng
      geoMarker.setGeometry(new Point(fromLonLat([lng, lat])))
    }, 100);
    clearInterval(interval)*/

    //geoMarker.setGeometry(new Point(fromLonLat([longitude, latitude])))
    //geoMarker.setGeometry(new Point(fromLonLat([baseLng, baseLat])))
  }, [latitude, longitude]);

  return (
    <div id="map" style={{
      width: '20rem',
      height: '20rem',
      backgroundColor: 'lightgray',
      color: 'gray',
    }}></div>
  );
}
