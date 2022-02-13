import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import DeliveryList from '../components/deliveryList'
import MapBox from '../components/mapBox'
import { getDeliveryDatas } from './api/deliveries'
import { IHit } from './types/type'
import randomColor from "randomcolor";

const Home: NextPage = () => {
  const [deliveryList, setDeliveryList] = useState<IHit[]>([]);  
  const [numberOfDeliveryDisplayed, setNumberOfDeleveryDisplayed] = useState<number>(5);
  const [markersColor, setMarkersColor] = useState<string[]>([]);

  useEffect(() => {
    deliveryList.forEach((delivery) => {
      setMarkersColor([...markersColor, markersColor[delivery._source.id] = randomColor()])
    })
  }, [deliveryList])

  useEffect(() => {
    getDeliveryDatas().then((res) => {
      if(res) {
        const {data} = res;
        console.log(data.hits.hits);
        setDeliveryList(data.hits.hits);
      }
    })
  }, [])

  return (
    <div >
      <Head>
        <title>Cocolis Map</title>
        <meta name="description" content="Map Cocolis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MapBox deliveryList={deliveryList} numberOfDeliveryDisplayed={numberOfDeliveryDisplayed} markersColor={markersColor} />
        <DeliveryList deliveryList={deliveryList} numberOfDeliveryDisplayed={numberOfDeliveryDisplayed} setNumberOfDeleveryDisplayed={setNumberOfDeleveryDisplayed} markersColor={markersColor}/>
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home
