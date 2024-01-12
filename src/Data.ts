export interface IData {
  title: string;
  description: string;
  position: {
    lat: number;
    lng: number;
  };
}

export const CARD_DATA: Data[] = [
  {
    title: "Jojo's pancake shop",
    description: "Yummy pancakes please come",
    position: { lat: -34.397, lng: 150.644 }
  },
  {
    title: "Rabbit's pancake shop",
    description: "Great pancakes please come and eat",
    position: { lat: -34.497, lng: 150.844 }
  },
  {
    title: "Hattie's pancake shop",
    description: "Cool pancakes haha",
    position: { lat: -34.797, lng: 150.244 }
  }
];
