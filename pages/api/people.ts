import { NextApiRequest, NextApiResponse } from 'next';

export interface PeopleProps {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch('https://swapi.dev/api/people');
  const data = await response.json();

  const dataCopy = { ...data };

  while (dataCopy.next) {
    await fetch(dataCopy.next)
      .then((result) => result.json())
      .then((resultData) => {
        dataCopy.next = resultData.next;
        dataCopy.results.push(resultData.results);
      });
  }

  dataCopy.results.flat().sort((a: any, b: any) => {
    switch (req.query.sort) {
      case 'name':
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      case 'height':
        return Number.parseInt(a.height) - Number.parseInt(b.height);
      case 'mass':
        let replaceA = a.mass;
        let replaceB = b.mass;

        if (a.mass.includes('unknown'))
          replaceA = a.mass.replace('unknown', '0');
        if (a.mass.includes(',')) replaceA = a.mass.replace(',', '');

        if (b.mass.includes(',')) replaceB = b.mass.replace(',', '');
        if (b.mass.includes('unknown'))
          replaceB = b.mass.replace('unknown', '0');

        return replaceA - replaceB;
      default:
        return;
    }
  });

  res.json(dataCopy);
}
