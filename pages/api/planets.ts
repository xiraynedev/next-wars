import { NextApiRequest, NextApiResponse } from 'next';

export interface DataProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: [
    {
      name: string;
      rotation_period: string;
      orbital_period: string;
      diameter: string;
      climate: string;
      gravity: string;
      terrain: string;
      surface_water: string;
      population: string;
      residents: string[];
      films: string[];
      created: string;
      edited: string;
      url: string;
    },
  ];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch('https://swapi.dev/api/planets');
  const data: DataProps = await response.json();

  const dataCopy = { ...data };

  while (dataCopy.next) {
    await fetch(dataCopy.next)
      .then((result) => result.json())
      .then((resultData) => {
        dataCopy.next = resultData.next;
        dataCopy.results.push(resultData.results);
      });
  }

  Promise.all(
    dataCopy.results[0].residents.map((resident: string) =>
      fetch(resident).then((resiResponse) => resiResponse.json()),
    ),
  ).then((promiseValue) => {
    dataCopy.results[0].residents = [];
    for (const person of promiseValue) {
      dataCopy.results[0].residents.push(person.name);
    }
    res.json(dataCopy.results[0]);
  });
}
