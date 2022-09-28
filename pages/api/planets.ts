import { PeopleResult } from './../../interfaces/index';
import { NextApiRequest, NextApiResponse } from 'next';
import { PlanetProps } from '../../interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch('https://swapi.dev/api/planets');
  const data: PlanetProps = await response.json();

  const dataCopy = { ...data };

  while (dataCopy.next) {
    await fetch(dataCopy.next)
      .then((result) => result.json())
      .then((resultData) => {
        dataCopy.next = resultData.next;
        dataCopy.results.push(resultData.results);
      });
  }

  const planets = dataCopy.results.flat();

  for (let i = 0; i < planets.length; i++) {
    const peopleResult: PeopleResult[] = await Promise.all(
      planets[i].residents.map((resident) =>
        fetch(resident).then((residentResponse) => residentResponse.json()),
      ),
    );

    planets[i].residents.length = 0;
    for (const person of peopleResult) {
      planets[i].residents.push(person.name);
    }
  }

  res.json(planets);
}
