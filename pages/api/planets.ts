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
    const residents: string[] = [];
    for (let j = 0; j < planets[i].residents.length; j++) {
      residents.push(planets[i].residents[j]);
    }
    await Promise.all(
      residents.map(
        async (resident) =>
          await fetch(resident).then((residentResponse) =>
            residentResponse.json(),
          ),
      ),
    ).then((residentData) => {
      residents.length = 0;
      residentData.forEach((person) => {
        residents.push(person.name);
      });
    });

    dataCopy.results.flat()[i].residents.length = 0;
    dataCopy.results.flat()[i].residents.push(...residents);
  }

  res.json(dataCopy);
}
