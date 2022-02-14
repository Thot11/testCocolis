import React from 'react';
import { IHit } from '../pages/types/type';

interface IDeliveryList {
  deliveryList: IHit[];
  numberOfDeliveryDisplayed: number;
  setNumberOfDeleveryDisplayed: (val: number) => void;
  markersColor: string[];
}

const DeliveryList: React.FC<IDeliveryList> = ({deliveryList, numberOfDeliveryDisplayed, setNumberOfDeleveryDisplayed, markersColor}) => {

  return (
    <div className='deliveryListContainer'>
      <div className="listWrapper">
        {deliveryList.map((delevery, key) => {
          if(key < numberOfDeliveryDisplayed) {
            return (
              <div className="deliveryContainer" key={key}>
                <span className='dot' style={{backgroundColor: markersColor[delevery._source.id]}}></span>
                <p className='id' >#{delevery._source.id}</p>
                <p className='title'>{delevery._source.title}</p>
              </div>
            )
          }
        })}
        
      </div>
      <div className="buttonContainer">
        <button className='loadMoreDelivery' onClick={() => setNumberOfDeleveryDisplayed(numberOfDeliveryDisplayed + 5)} disabled={deliveryList.length < numberOfDeliveryDisplayed}>Charger les suivantes</button>
      </div>
    </div>
  );
};

export default DeliveryList;
