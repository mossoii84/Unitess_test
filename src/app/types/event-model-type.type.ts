
export type EventModelType = {
  id:number;
  name:string;
  description:string;
  address: string;
  type:TypeForEvent,
  sport?:number,
  music?:string
}

export type TypeForEvent = 'sport' | 'music' | 'other';