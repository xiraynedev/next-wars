import { getResidents } from './../../utils/functions';
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

  const peopleResult = await getResidents([...planets]);

  peopleResult.forEach((person, index: number) => {
    planets[index].residents.push(person.name);
  });

  res.json(planets);
}
