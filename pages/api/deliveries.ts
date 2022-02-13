// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import { IDeliveries } from '../types/type';

// Post
export const getDeliveryDatas = async () => {
  
  return await axios.request<IDeliveries>({
    method: 'POST',
    url: `https://staging.cocolis.fr/es/rides/_search`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Dpr': '2',
      'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
    },
    data: {
      "size": 151,
      "query": {
        "bool": {
          "filter": [
            {
              "range": {
                "to_pickup_date": {
                  "gte": "2021-11-24T08:43:01.660Z"
                }
              }
            }
          ]
        }
      },
      "sort": [
        {
          "last_edited_at": {
            "order": "desc"
          }
        }
      ],
      "from": 0
    }
  })
};