import React, {useState} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
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
    longitude: 2.3,
    latitude: 49.14222,
    zoom: 3.5, 
  });


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

            return (
              // Offset marker corresponds to mapWidth/2 and mapHeight
              <Marker latitude={delivery._source.from_lat} longitude={delivery._source.from_lng} anchor="bottom" pitchAlignment={'map'} key={key} offset={[190, -510]}>
                <svg 
                  height={viewState.zoom * 3}
                  viewBox="0 0 24 24"
                  className='customMarker'
                >
                  <path d={ICON} fill={markersColor[delivery._source.id]}/>
                </svg>
              </Marker>
            )
          }
        })}
        
        {deliveryList.map((delivery, key) => {
          if(key < numberOfDeliveryDisplayed ) {

            return (
              <Marker latitude={delivery._source.to_lat} longitude={delivery._source.to_lng} anchor="bottom" key={delivery._source.id} offset={[190, -510]}>
                <svg 
                  height={viewState.zoom * 3}
                  viewBox="0 0 24 24"
                  className='customMarker'
                >
                  <path d={ICON} fill={markersColor[delivery._source.id]}/>
                </svg>
              </Marker>
            )
          }
        })}
      </ReactMapGL>
    </div>
  );
};

export default MapBox;
