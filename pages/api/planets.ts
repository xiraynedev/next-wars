import { NextApiRequest, NextApiResponse } from 'next';
import { PeopleResult, PlanetProps } from '../../interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch('https://swapi.py4e.com/api/planets/');
  const data: PlanetProps = await response.json();

  while (data.next) {
    const dataResponse = await fetch(data.next);
    const dataResult = await dataResponse.json();
    data.next = dataResult.next;
    data.results.push(dataResult.results);
  }

  const planets = data.results.flat();

  for (let i = 0; i < planets.length; i++) {
    const peopleResult: PeopleResult[] = await Promise.all(
      planets[i].residents.map((resident) =>
        fetch(resident).then((residentResponse) => residentResponse.json()),
      ),
    );

    planets[i].residents.length = 0;
    peopleResult.forEach((person) => {
      planets[i].residents.push(person.name);
    });
  }

  res.json(planets);
}
