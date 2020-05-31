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

  const [geoMarker] = useState(new Feature({ type: 'geoMarker' }));

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

  const [map] = useState(new Map({
    target: null, // set this in `useEffect`
    view: null,   // set this in `useEffect`
    layers: [
      new TileLayer({
        source: new OSM()
      }),
      vectorLayer
    ],
  }));

  useEffect(() => {
    console.log('effect')
    if (latitude === null || longitude === null) {
      // disable map
      map.setView(null)
    } else {
      if (map.getView() === null) {
        const view = new View({
          center: fromLonLat([longitude, latitude]),
          zoom: 14.5,
        })
        geoMarker.setGeometry(new Point(fromLonLat([longitude, latitude])));
        map.setView(view);
        map.setTarget('map');
      }
      const geometry = geoMarker.getGeometry();
      geometry.setCoordinates(fromLonLat([longitude, latitude]))
    }
  }, [latitude, longitude, geoMarker, map]);

  function renderMap() {
    if (latitude === null || longitude === null) {
      return <span>Map N/A</span>
    }
    return <div id="map" style={{ width: '100%', height: '100%' }}></div>
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20rem',
      height: '20rem',
      backgroundColor: 'lightgray',
      color: 'gray',
    }}>
      { renderMap() }
    </div>
  );
}
