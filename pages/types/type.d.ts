export interface ISource {
  id: number,
  title: string,
  from_lat: number,
  from_lng: number,
  to_lat: number,
  to_lng: number,
}

export interface IHit {
  _source: ISource,
}

export interface IHits {
  hits: IHit[],
  total: {value: number},
}

export interface IDeliveries {
  hits: IHits;
}