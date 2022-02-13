import React, {useRef, useState, useEffect, useMemo} from 'react';
import ReactMapGL, {Marker, Layer, Source } from 'react-map-gl';
import { IHit } from '../pages/types/type';

interface IMapBox {
  deliveryList: IHit[];
  numberOfDeliveryDisplayed: number;
  markersColor: string[];
}

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const MapBox: React.FC<IMapBox> = ({deliveryList, numberOfDeliveryDisplayed, markersColor}) => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [viewState, setViewState] = useState({
    longitude: 2.47306,
    latitude: 49.14222,
    zoom: 3.5, 
  });

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {type: 'Feature', geometry: {type: 'Polygon', coordinates: [-122.4, 37.8]}}
    ]
  };
  
  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };


  return (
    <div className='mapBoxContainer'>
      <ReactMapGL
        {...viewState}
        mapboxAccessToken={accessToken}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: '100%', height: '100%'}}
        mapStyle={"https://api.maptiler.com/maps/streets/style.json?key=RVqrAzdxmF8lTLoFpOJa"}
      >
      
        {deliveryList.map((delivery, key) => {
          if(key < numberOfDeliveryDisplayed ) {

            const geojson = {
              type: 'FeatureCollection',
              features: [
                {type: 'Feature', geometry: {type: 'Polygon', coordinates: [[delivery._source.from_lat, delivery._source.from_lng], [delivery._source.to_lat, delivery._source.to_lng]]}}
              ]
            };
            
            const layerStyle = {
              id: 'point',
              type: 'circle',
              paint: {
                'circle-radius': 10,
                'circle-color': '#007cbf'
              }
            };

            return (
                <>
                <Marker latitude={delivery._source.from_lat} longitude={delivery._source.from_lng} anchor="bottom" pitchAlignment={'map'} key={key}>
                  <svg 
                    height={20}
                    viewBox="0 0 24 24"
                  >
                    <path d={ICON} fill={markersColor[delivery._source.id]}/>
                  </svg>
                </Marker>

                <Source id="my-data" type="geojson" data={geojson}>
                  <Layer {...layerStyle} />
                </Source>
                
                <Marker latitude={delivery._source.to_lat} longitude={delivery._source.to_lng} anchor="bottom" key={-key + 1}>
                  <svg 
                    height={20}
                    viewBox="0 0 24 24"
                  >
                    <path d={ICON} fill={markersColor[delivery._source.id]}/>
                  </svg>
                </Marker>
              </>
            )
          }
        })}
      </ReactMapGL>
    </div>
  );
};

export default MapBox;
