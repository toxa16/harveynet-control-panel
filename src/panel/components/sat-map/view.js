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
  const { online, latitude, longitude } = machine.state;

  const [geoMarker] = useState(new Feature({
    type: 'geoMarker',
    geometry: new Point(fromLonLat([0, 90])),   // North Pole :-)
  }));

  const styles = {
    'geoMarker': new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({color: 'black'}),
        stroke: new Stroke({ color: 'white', width: 2 }),
      })
    })
  };
  const vectorLayer = new Vector({
    source: new VectorSource({
      features: [geoMarker]
    }),
    style: feature => styles[feature.get('type')],
  });

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (online) {
      setMap(new Map({
        target: 'map',
        view: new View({
          zoom: 14.5,
          center: fromLonLat([0, 90]),
        }),
        layers: [
          new TileLayer({ source: new OSM() }),
          vectorLayer,
        ],
      }))
    } else {
      map && map.dispose();
      setMap(null);
    }
  }, [online]);

  useEffect(() => {
    map && map.getView().setCenter(fromLonLat([longitude, latitude]))
    const geometry = geoMarker.getGeometry();
    geometry.setCoordinates(fromLonLat([longitude, latitude]))
  }, [latitude, longitude]);

  return (
    <div style={{ position: 'relative', width: '20rem', height: '20rem' }}>
      <div id="map" style={{
        width: '100%',
        height: '100%',
      }}></div>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: online ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'lightgray',
        color: 'gray',
      }}>
        <span>Map N/A</span>
      </div>
    </div>
  );
}
